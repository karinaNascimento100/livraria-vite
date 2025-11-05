<#
.SYNOPSIS
  Build, start the one-port server (127.0.0.1:8080), wait until ready, run Lighthouse, and optionally stop the server.

DESCRIPTION
  This script is intended as a single, robust entrypoint for CI/local audits using the project's one-port server.
  It was written to avoid common PowerShell pitfalls and to follow the project's preference for explicit Invoke-Expression
  (instead of the iex alias). It uses a temporary Chrome profile and proxy-bypass flags to reduce "chrome interstitial"
  problems seen previously.

  By default it will:
   - run `npm run build` to create `dist/`
   - start `npm run serve` (the server that serves API + dist on 127.0.0.1:8080)
   - wait up to 60s for the port to accept TCP connections
   - run `npx lighthouse` against http://127.0.0.1:8080 with HTML + JSON outputs saved under ./reports
   - stop the server process it started (unless -NoStop is supplied)

PARAMETER HostName
  Host to contact (default: 127.0.0.1)

PARAMETER Port
  Port to contact (default: 8080)

PARAMETER NoStop
  When supplied, the script will not attempt to stop the server it started.

PARAMETER ChromePath
  Optional explicit Chrome/Chromium executable path. If empty, Lighthouse will use the system-installed chrome.

EXAMPLES
  # Run a complete build + audit and stop the server afterwards
  .\run_one_port_lighthouse.ps1

  # Keep the server running after the audit
  .\run_one_port_lighthouse.ps1 -NoStop

NOTES
  - Requires Node.js, npm, and npx to be available in PATH.
  - Designed for Windows PowerShell (5.1+) and tested in this repo layout.
#>

[CmdletBinding()]
param(
  [string]$HostName = '127.0.0.1',
  [int]$Port = 8080,
  [switch]$NoStop,
  [string]$ChromePath = ''
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Wait-ForPort {
  param(
    [string]$HostName,
    [int]$Port,
    [int]$TimeoutSec = 60
  )
  $end = (Get-Date).AddSeconds($TimeoutSec)
  while ((Get-Date) -lt $end) {
    try {
  $res = Test-NetConnection -ComputerName $HostName -Port $Port -WarningAction SilentlyContinue
      if ($res -and $res.TcpTestSucceeded) { return $true }
    } catch {
      # Test-NetConnection can throw on some systems; ignore and retry
    }
    Start-Sleep -Milliseconds 500
  }
  return $false
}

function Initialize-ReportsDir {
  param([string]$Dir = 'reports')
  if (-not (Test-Path $Dir)) { New-Item -ItemType Directory -Path $Dir | Out-Null }
  return (Resolve-Path $Dir).Path
}

try {
  Write-Host "Starting Lighthouse orchestration: host=$HostName port=$Port"

  $reportsDir = Initialize-ReportsDir
  $ts = (Get-Date).ToString('yyyyMMdd-HHmmss')
  $htmlPath = Join-Path $reportsDir "lighthouse-$ts.html"
  $jsonPath = Join-Path $reportsDir "lighthouse-$ts.json"

  # 1) Build the frontend (safe, idempotent)
  Write-Host '1/4: Building project (npm run build) ...'
  & npm.cmd run build

  # 2) Start the one-port server (npm run serve)
  Write-Host '2/4: Starting one-port server (npm run serve) ...'
  $startInfo = Start-Process -FilePath npm -ArgumentList 'run','serve' -PassThru -WindowStyle Hidden

  # 3) Wait for port readiness
  Write-Host "3/4: Waiting for ${HostName}:$Port to accept connections (timeout 60s) ..."
  $ok = Wait-ForPort -HostName $HostName -Port $Port -TimeoutSec 60
  if (-not $ok) {
    throw "Timeout waiting for ${HostName}:$Port. Server did not become reachable."
  }
  Write-Host "Server is up at http://${HostName}:$Port"

  # 4) Run Lighthouse using npx
  Write-Host "4/4: Running Lighthouse against http://${HostName}:$Port ..."

  # Build Chrome flags recommended to reduce interstitials and ensure direct connections
  $profileDir = Join-Path $env:TEMP "lh_profile_$ts"
  $chromeFlags = "--no-first-run --no-default-browser-check --allow-insecure-localhost --user-data-dir=$profileDir --proxy-server=direct:// --proxy-bypass-list=*"

  $targetUrl = "http://${HostName}:$Port/"

  $lhCmd = @()
  if ($ChromePath) { $lhCmd += "--chrome-path `"$ChromePath`"" }
  $lhCmd += @('--chrome-flags', "`"$chromeFlags`"")
  $lhCmd += @('--output', 'html', '--output-path', $htmlPath)
  $lhCmd += @('--output', 'json', '--output-path', $jsonPath)
  $lhCmd += @('--quiet')

  # Compose full argument string for use with npx
  $lhArgs = "lighthouse --quiet `"$targetUrl`" $($lhCmd -join ' ')"

  # Use Invoke-Expression (explicit) per project preference
  Write-Host "Running: npx $lhArgs"
  Invoke-Expression "npx $lhArgs"

  Write-Host "Lighthouse finished. Reports written to:`n  $htmlPath`n  $jsonPath"

} catch {
  Write-Error "Error: $_"
  throw
} finally {
  if (-not $NoStop) {
    try {
      if ($startInfo -and -not $startInfo.HasExited) {
        Write-Host 'Stopping server started by this script...'
        Stop-Process -Id $startInfo.Id -Force -ErrorAction SilentlyContinue
      }
    } catch {
      Write-Warning "Failed to stop server process: $_"
    }
  } else {
    Write-Host 'NoStop flag provided; leaving server running.'
  }
}

Write-Host 'Done.'
