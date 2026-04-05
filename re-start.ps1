$port = 9147
$dir = $PSScriptRoot

# Kill anything on the port
$existing = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($existing) { $existing | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue } }

Write-Host ""
Write-Host "  Serving v5 explainers on:" -ForegroundColor Cyan
Write-Host "  http://localhost:$port" -ForegroundColor Green
Write-Host "  $dir" -ForegroundColor DarkGray
Write-Host "  Press Ctrl+C to stop" -ForegroundColor DarkGray
Write-Host ""

Start-Process "http://localhost:$port/index.html"

python3 -m http.server $port --directory "$dir" --bind 127.0.0.1
