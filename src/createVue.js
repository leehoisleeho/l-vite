import fs from 'fs';
import path from 'path';

const content = (name) => {
    return `<script setup lang="ts">

</script>

<template>
  <span>${name}</span>
</template>

<style scoped>

</style>
 `
}

export function createVue(name) {
    if (fs.existsSync('./src/pages')) {
        let _name = name
        const filePath = path.join( process.cwd(), `./src/pages/${_name}.vue`)

        // 文件内容
        const fileContent = content(_name)
        if (fs.existsSync(filePath)) {
            console.error(`创建失败,${_name}.vue文件已存在`);
        } else {
            fs.writeFile(filePath, fileContent, (err) => {
                if (err) {
                    console.error('无法创建文件:', err);
                } else {
                    console.log(`${_name}.vue 创建成功`);
                    const filePath = path.join( process.cwd(), `./router/index.js`); // 文件路径
                    const lineNumberToInsert = 2; // 要插入的行号
                    const textToInsert = `const ${_name} = ()=>import('../src/pages/${_name}.vue')`
                    // 1. 读取原始文件的内容，并将其分割成行
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error('无法读取文件:', err);
                            return;
                        }
                        const lines = data.split('\n');
                        // 2. 在指定的行号之前插入新的文本
                        lines.splice(lineNumberToInsert - 1, 0, textToInsert);
                        // 3. 将修改后的内容重新组合成一个字符串，并将其写回原始文件
                        const updatedContent = lines.join('\n');
                        fs.writeFile(filePath, updatedContent, (writeErr) => {
                            if (writeErr) {
                                console.error('无法写入文件:', writeErr);
                            } else {
                                console.log('文本已成功插入到指定行');
                            }
                        });
                    });
                }
            });
        }
    } else {
        console.error('src下没有找到pages文件夹');
    }
}