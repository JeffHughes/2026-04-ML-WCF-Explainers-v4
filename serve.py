import http.server, os, sys

# Always serve from the v5 directory, even if script is copied elsewhere
SERVE_DIR = r"D:\software\InfiniteCabinet\backup-prd-docs\docs\explainers\v5"
if os.path.isdir(os.path.dirname(os.path.abspath(__file__)) + os.sep + "shared.css"):
    SERVE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(SERVE_DIR)

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

print("Serving on http://localhost:9147 (no-cache)")
http.server.HTTPServer(("", 9147), NoCacheHandler).serve_forever()
