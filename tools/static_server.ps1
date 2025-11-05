param(
    [int]$Port = 8080,
    [string]$Root = "$(Join-Path (Get-Location) 'dist')"
)

<# DEPRECATED: this lightweight HttpListener server was used during
   troubleshooting to serve `dist/` on alternate ports. We standardized on
   127.0.0.1:8080 and prefer the Express one-port server (server/index.js).
   This script remains for reference but defaults to port 8080 to avoid
   confusion.
#>

Add-Type -AssemblyName System.Web
$prefix = "http://127.0.0.1:$Port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
    $listener.Start()
    Write-Output "Static server listening on $prefix, serving from $Root"
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        Start-Job -ArgumentList $context.Request.RawUrl, $Root -ScriptBlock {
            param($rawUrl, $root)
            try {
                $reqUrl = [System.Uri]::UnescapeDataString($rawUrl)
                $localPath = $reqUrl.TrimStart('/')
                if ([string]::IsNullOrEmpty($localPath)) { $localPath = 'index.html' }
                $filePath = Join-Path $root $localPath
                if (-not (Test-Path $filePath)) {
                    $response = $args[0].HttpListenerResponse
                    $response.StatusCode = 404
                    $buffer = [System.Text.Encoding]::UTF8.GetBytes('Not Found')
                    $response.OutputStream.Write($buffer, 0, $buffer.Length)
                    $response.Close()
                    return
                }
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response = $args[0].HttpListenerResponse
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
                $response.Close()
            } catch {
                try { $args[0].HttpListenerResponse.Close() } catch {}
            }
        }
    }
} catch {
    Write-Error "Static server error: $_"
} finally {
    if ($listener -and $listener.IsListening) { $listener.Stop() }
}
