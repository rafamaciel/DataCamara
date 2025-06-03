import sys
import os
import requests
import tempfile
import shutil

def download_file(target, destination):
    file_name = os.path.basename(target)
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection": "keep-alive"
    }

    try:
        with requests.get(target, headers=headers, stream=True, timeout=10) as response:
            status_code = response.status_code
            if status_code == 200:
                with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
                    for chunk in response.iter_content(chunk_size=8192):
                        if chunk:
                            tmp_file.write(chunk)
                os.makedirs(destination, exist_ok=True)
                final_path = os.path.join(destination, file_name)
                shutil.move(tmp_file.name, final_path)
            else:
                print(f"Não foi possível baixar {target} (HTTP {status_code}). Pulando.")
    except requests.RequestException as e:
        print(f"Erro ao tentar baixar {target}: {e}. Pulando.")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(f"Uso: {sys.argv[0]} <URL> <destino>", file=sys.stderr)
        sys.exit(1)

    target_url = sys.argv[1]
    destination_dir = sys.argv[2]
    download_file(target_url, destination_dir)
