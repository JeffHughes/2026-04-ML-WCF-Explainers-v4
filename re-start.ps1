$port = 9147
$dir = $PSScriptRoot

# Kill anything on the port
$existing = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($existing) { $existing | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue } }

Write-Host ""
Write-Host "  Serving v5 explainers on:" -ForegroundColor Cyan
Write-Host "  http://localhost:$port" -ForegroundColor Green
Write-Host "  $dir" -ForegroundColor DarkGray
Write-Host "  No-cache headers enabled (changes reload instantly)" -ForegroundColor DarkGray
Write-Host "  Press Ctrl+C to stop" -ForegroundColor DarkGray
Write-Host ""

Start-Process "http://localhost:$port/index.html"

python -c @"
import http.server, os
os.chdir(r'$dir')
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control','no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma','no-cache')
        self.send_header('Expires','0')
        super().end_headers()
http.server.HTTPServer(('127.0.0.1',$port),H).serve_forever()
"@
