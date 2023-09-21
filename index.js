import fs from 'fs';
import {execSync} from 'child_process';
import path from 'path';

const content = (name)=>{
    return `<script setup lang="ts">
</script>

<template>
  <span>${name}</span>
</template>

<style scoped></style>
 `
}

export function createVue(name){
    const filePath = `./pages/${name}.vue`;
    let _name = name
    // 文件内容
    const fileContent = content(_name)
    if (fs.existsSync(filePath)) {
        console.error('创建失败,文件名已存在:', filePath);
    } else {
        fs.writeFile(filePath, fileContent, (err) => {
            if (err) {
                console.error('无法创建文件:', err);
            } else {
                console.log('文件已成功创建');
            }
        });
    }
}

const routeContent = ()=>{
    return `import xxx from 'xxxpath'
import {createRouter, createWebHashHistory} from 'vue-router';
const routes = [
  {
    path: '/',
    component: login,
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
`
}
export function creteRouter(){
    // 执行安装命令
    execSync('bun install vue-router@4');
    try {
        const isVueRouterInstalled = true; // 假设安装成功
        if (isVueRouterInstalled) {
            // 创建route文件夹
            const routeFolderPath = path.join(process.cwd(), 'router');
            if(!fs.existsSync(routeFolderPath)){
                fs.mkdirSync(routeFolderPath, { recursive: true });
                // 创建index.js文件并写入内容
                const indexPath = path.join(routeFolderPath, 'index.js');
                const indexContent = routeContent()
                fs.writeFileSync(indexPath, indexContent);
                console.log('router创建成功');
            }else {
                console.error('已经存在router文件夹')
            }
        }else {
            console.error('安装vue-router失败');
        }
    }catch (err){
        console.error(`执行命令时出错: ${err}`);
    }
}