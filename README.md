# 怎样批量操作

## 功能点
  * 批量删除文件夹
  * 批量新增文件夹
  * 批量压缩文件夹
  * 批量执行

## 批量删除或添加文件夹
> 删除你指定目录下所有文件夹的第一级指定子文件夹

### 例子

目录结构
```txt
/work
  /a
    /a
    /b
    /c
  /b
    /a
    /b
    /c
  /c
    /a
    /b
    /c
```

执行命令

```bash
bo rm a [b...] -w /path/to/work
# or
bo mkdir e [b...] --work-dir /path/to/work
```

结果
```txt
/work
  /a
    /b
    /c
  /b
    /b
    /c
  /c
    /b
    /c

/work
  /a
    /b
    /c
    /e
  /b
    /b
    /c
    /e
  /c
    /b
    /c
    /e
```

## 批量执行

### 例子

目录结构
```txt
/work
  /a
    /a
    /b
    /c
  /b
    /a
    /b
    /c
  /c
    /a
    /b
    /c
```

批量执行命令

```bash
bo exec 'yarn init -y' -w /Users/path/to/work
bo exec 'yarn init -y' --work-dir /Users/path/to/work
bo exec ls --work-dir /Users/path/to/work
```

结果
```txt
/work
  /a
    /a
    /b
    /c
    package.json
  /b
    /a
    /b
    /c
    package.json
  /c
    /a
    /b
    /c
    package.json
```

## 批量压缩

### 例子

目录结构
```txt
/work
  /a
    /a
    /b
    /c
  /b
    /a
    /b
    /c
  /c
    /a
    /b
    /c
```

```bash
bo compress -w /Users/path/to/work
```

结果
```txt
/work
  /a
    /a
    /b
    /c
  /b
    /a
    /b
    /c
  /c
    /a
    /b
    /c
  a.tar
  b.tar
  c.tar
```
