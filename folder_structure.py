#!/usr/bin/env python3
import os
import sys

def get_tree_structure(start_path, prefix="", is_last=True, exclude_file=None, base_path=None):
    """
    Рекурсивно генерирует древовидную структуру папок и файлов
    с полными путями
    """
    if not os.path.exists(start_path):
        return ""
    
    if base_path is None:
        base_path = start_path
    
    # Получаем относительный путь от базовой директории
    rel_path = os.path.relpath(start_path, base_path)
    if rel_path == ".":
        name = os.path.basename(start_path) if os.path.basename(start_path) else start_path
    else:
        name = rel_path.replace(os.sep, '/')  # Используем / для консистентности
    
    # Пропускаем файл вывода
    if os.path.basename(start_path) == exclude_file:
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
                exclude_file,
                base_path
            )
    
    return result

def get_file_contents(start_path, extensions=None, exclude_file=None, base_path=None):
    """
    Собирает содержимое всех файлов с указанными расширениями
    с полными путями
    """
    if base_path is None:
        base_path = start_path
    
    if extensions is None:
        extensions = ['.ts', '.tsx', '.js', '.jsx', '.json', 
                     '.scss', '.css', '.txt', '.md', '.yml', 
                     '.yaml', '.xml', '.html', '.htm', '.py', 
                     '.java', '.cpp', '.c', '.h', '.cs', '.go',
                     '.rb', '.php', '.swift', '.kt', '.rs', 
                     '.sh', '.bash', '.zsh', '.ps1', '.bat',
                     '.ini', '.cfg', '.conf', '.toml']
    
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
                # Получаем полный абсолютный путь
                abs_path = os.path.abspath(file_path)
                # И относительный путь от базовой директории
                rel_path = os.path.relpath(file_path, os.path.dirname(base_path))
                rel_path = rel_path.replace(os.sep, '/')  # Используем / для консистентности
                
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
                    'abs_path': abs_path,  # Абсолютный путь
                    'rel_path': rel_path,   # Относительный путь
                    'content': content
                })
    
    # Сортируем по пути для консистентности
    results.sort(key=lambda x: x['rel_path'].lower())
    
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
    output_path = os.path.join(os.path.dirname(target_folder), output_file)
    
    print(f"Сканируем папку: {target_folder}")
    print(f"Результат будет сохранен в: {output_path}")
    
    # Получаем структуру папок с полными путями
    print("Генерируем древовидную структуру...")
    tree_structure = get_tree_structure(target_folder, exclude_file=output_file, base_path=target_folder)
    
    # Получаем содержимое файлов с полными путями
    print("Читаем содержимое файлов...")
    file_contents = get_file_contents(target_folder, exclude_file=output_file, base_path=target_folder)
    
    # Записываем всё в файл
    with open(output_path, 'w', encoding='utf-8') as f:
        # Записываем заголовок с информацией о папке
        f.write(f"АНАЛИЗ ПАПКИ: {target_folder}\n")
        f.write(f"Дата создания отчета: {sys.version_info[0]}.{sys.version_info[1]}.{sys.version_info[2]}\n")
        f.write("=" * 80 + "\n\n")
        
        # Записываем структуру
        f.write("СТРУКТУРА ПАПОК (полные пути):\n")
        f.write("-" * 80 + "\n\n")
        f.write(tree_structure)
        
        # Записываем содержимое файлов
        if file_contents:
            f.write("\n\n" + "=" * 80 + "\n")
            f.write("СОДЕРЖАНИЕ ФАЙЛОВ:\n")
            f.write("=" * 80 + "\n\n")
            
            for i, item in enumerate(file_contents):
                # Выводим абсолютный путь
                f.write(f"АБСОЛЮТНЫЙ ПУТЬ: {item['abs_path']}\n")
                # Выводим относительный путь (как в вашем примере)
                f.write(f"название файла: {item['rel_path']}\n\n")
                
                # Записываем содержимое файла
                f.write("СОДЕРЖИМОЕ ФАЙЛА:\n")
                f.write("-" * 40 + "\n")
                f.write(item['content'])
                
                if i < len(file_contents) - 1:
                    f.write("\n\n" + "_" * 80 + "\n\n")
                else:
                    f.write("\n\n" + "=" * 80 + "\n")
        
        # Добавляем статистику в конец
        f.write(f"\nСТАТИСТИКА:\n")
        f.write(f"-" * 40 + "\n")
        f.write(f"Обработано файлов: {len(file_contents)}\n")
        f.write(f"Общий размер папки: {get_folder_size(target_folder):,.0f} байт\n")
        f.write(f"Дата создания отчета: {get_current_time()}\n")

def get_folder_size(folder_path):
    """Вычисляет общий размер папки в байтах"""
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(folder_path):
        for filename in filenames:
            filepath = os.path.join(dirpath, filename)
            if os.path.isfile(filepath):
                total_size += os.path.getsize(filepath)
    return total_size

def get_current_time():
    """Возвращает текущее время в формате строки"""
    from datetime import datetime
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

if __name__ == "__main__":
    main()