import os
import sys
import pandas as pd

def convert_csvs_to_single_parquet(input_folder, output_folder):
    if not os.path.isdir(input_folder):
        print(f"Erro: '{input_folder}' não é um diretório válido.", file=sys.stderr)
        sys.exit(1)

    os.makedirs(output_folder, exist_ok=True)

    files = [f for f in os.listdir(input_folder) if f.lower().endswith('.csv')]

    if not files:
        print("Nenhum arquivo CSV encontrado na pasta.")
        return

    all_dfs = []

    for csv_file in sorted(files):
        csv_path = os.path.join(input_folder, csv_file)
        try:
            print(f"Lendo: {csv_file}")
            try:
                df = pd.read_csv(csv_path)
            except pd.errors.ParserError:
                df = pd.read_csv(csv_path, sep=';', low_memory=False)

            all_dfs.append(df)
        except Exception as e:
            print(f"Erro ao ler '{csv_file}': {e}", file=sys.stderr)

    if not all_dfs:
        print("Nenhum CSV pôde ser carregado.", file=sys.stderr)
        return

    full_df = pd.concat(all_dfs, ignore_index=True)

    folder_name = os.path.basename(os.path.normpath(input_folder))
    parquet_path = os.path.join(output_folder, f"{folder_name}.parquet")

    try:
        full_df.to_parquet(parquet_path, index=False)
        print(f"Parquet gerado: {parquet_path}")
    except Exception as e:
        print(f"Erro ao salvar o Parquet: {e}", file=sys.stderr)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python csv_folder_to_parquet.py <pasta_entrada> <pasta_saida>", file=sys.stderr)
        sys.exit(1)

    input_dir = sys.argv[1]
    output_dir = sys.argv[2]

    convert_csvs_to_single_parquet(input_dir, output_dir)
