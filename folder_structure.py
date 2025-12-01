#!/usr/bin/env python3
import os
import sys

def get_tree_structure(start_path, prefix="", is_last=True, exclude_file=None):
    """
    Рекурсивно генерирует древовидную структуру папок и файлов
    """
    if not os.path.exists(start_path):
        return ""
    
    name = os.path.basename(start_path)
    
    # Пропускаем файл вывода
    if name == exclude_file:
        return ""
    
    result = ""
    
    if prefix == "":
        # Корневая папка
        result += f"{name}\n"
    else:
        branch = "└── " if is_last else "├── "
        result += f"{prefix}{branch}{name}\n"
    
    if os.path.isdir(start_path):
        items = []
        for item in os.listdir(start_path):
            item_path = os.path.join(start_path, item)
            if item != exclude_file:  # Пропускаем файл вывода
                items.append((item, item_path))
        
        # Сортируем: сначала папки, потом файлы
        items.sort(key=lambda x: (not os.path.isdir(x[1]), x[0].lower()))
        
        for i, (item_name, item_path) in enumerate(items):
            is_last_item = (i == len(items) - 1)
            extension = "    " if is_last else "│   "
            result += get_tree_structure(
                item_path, 
                prefix + extension, 
                is_last_item,
                exclude_file
            )
    
    return result

def get_file_contents(start_path, extensions=None, exclude_file=None):
    """
    Собирает содержимое всех файлов с указанными расширениями
    """
    if extensions is None:
        extensions = ['.ts', '.tsx', '.js', '.jsx', '.json', 
                     '.scss', '.css', '.txt', '.md', '.yml', 
                     '.yaml', '.xml', '.html', '.htm', '.py', 
                     '.java', '.cpp', '.c', '.h', '.cs']
    
    results = []
    
    for root, dirs, files in os.walk(start_path):
        # Пропускаем скрытые папки (начинающиеся с .)
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        # Сортируем для консистентного вывода
        files.sort(key=lambda x: x.lower())
        
        for file in files:
            file_path = os.path.join(root, file)
            
            # Пропускаем файл вывода
            if file == exclude_file:
                continue
            
            # Проверяем расширение
            if any(file.endswith(ext) for ext in extensions):
                rel_path = os.path.relpath(file_path, start=os.path.dirname(start_path))
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                except UnicodeDecodeError:
                    try:
                        with open(file_path, 'r', encoding='latin-1') as f:
                            content = f.read()
                    except:
                        content = "[Binary file or unsupported encoding]"
                except Exception as e:
                    content = f"[Error reading file: {str(e)}]"
                
                results.append({
                    'path': rel_path,
                    'content': content
                })
    
    return results

def main():
    # Проверяем аргументы командной строки
    if len(sys.argv) > 1:
        target_folder = sys.argv[1]
    else:
        # Если аргумент не передан, используем текущую папку
        target_folder = input("Введите путь к папке (или оставьте пустым для текущей): ").strip()
        if not target_folder:
            target_folder = "."
    
    target_folder = os.path.abspath(target_folder)
    
    if not os.path.exists(target_folder):
        print(f"Ошибка: Папка '{target_folder}' не найдена!")
        return
    
    output_file = "FolderStructure.txt"
    
    print(f"Сканируем папку: {target_folder}")
    print(f"Результат будет сохранен в: {output_file}")
    
    # Получаем структуру папок
    print("Генерируем древовидную структуру...")
    tree_structure = get_tree_structure(target_folder, exclude_file=output_file)
    
    # Получаем содержимое файлов
    print("Читаем содержимое файлов...")
    file_contents = get_file_contents(target_folder, exclude_file=output_file)
    
    # Записываем всё в файл
    with open(output_file, 'w', encoding='utf-8') as f:
        # Записываем структуру
        f.write("СТРУКТУРА ПАПОК:\n")
        f.write("=" * 80 + "\n\n")
        f.write(tree_structure)
        
        # Записываем содержимое файлов
        if file_contents:
            f.write("\n\n" + "=" * 80 + "\n")
            f.write("СОДЕРЖАНИЕ ФАЙЛОВ:\n")
            f.write("=" * 80 + "\n\n")
            
            for i, item in enumerate(file_contents):
                f.write(f"название файла {item['path']}\n\n")
                f.write(item['content'])
                
                if i < len(file_contents) - 1:
                    f.write("\n\n" + "_" * 40 + "\n\n")
    
    print(f"Готово! Файл '{output_file}' создан.")
    print(f"Обработано файлов: {len(file_contents)}")

if __name__ == "__main__":
    main()