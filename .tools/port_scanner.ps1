# Repo port scanner (based on user's pattern list)
# Saves results to stdout: File, Line, Text

$patterns = @(
  'listen\(\s*\d{2,5}\s*\)',              # app.listen(3000)
  'server:\s*{[^}]*port\s*:\s*\d{2,5}',   # vite server.port
  'preview:\s*{[^}]*port\s*:\s*\d{2,5}',  # vite preview.port
  '\bPORT\s*=\s*\d{2,5}\b',               # PORT=3000 (env/scripts)
  '--port\s*\d{2,5}',                     # scripts com --port 3000
  'localhost:\d{2,5}\b',
  '127\\.0\\.0\\.1:\d{2,5}\b',
  'VITE_API_BASE_URL',
  'baseURL\s*:\s*[\"\']http.*:\d{2,5}[\"\']' # configs de testes
)

Get-ChildItem -Recurse -File -Include *.js,*.ts,*.tsx,*.jsx,*.json,*.mjs,*.cjs,*.env,*.yml,*.yaml |
Where-Object { $_.FullName -notmatch '\\dist\\' } |
ForEach-Object {
  $file = $_.FullName
  foreach($p in $patterns){
    Select-String -Path $file -Pattern $p -AllMatches | ForEach-Object {
      [PSCustomObject]@{ File=$file; Line=$_.LineNumber; Text=$_.Line.Trim() }
    }
  }
} | Sort-Object File, Line | Format-Table -AutoSize
