import fs from 'fs';
import {execSync} from 'child_process';
import path from 'path';

export const routeContent = () => {
    return `import {createRouter, createWebHashHistory} from 'vue-router';
    
const routes = [
  // {path:'/',component:login}
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
`
}

export function creteRouter() {
    try {
        execSync('bun install vue-router@4');
        // 创建route文件夹
        const routeFolderPath = path.join(process.cwd(), 'router');
        if (!fs.existsSync(routeFolderPath)) {
            fs.mkdirSync(routeFolderPath, {recursive: true});
            // 创建index.js文件并写入内容
            const indexPath = path.join(routeFolderPath, 'index.js');
            const indexContent = routeContent()
            fs.writeFileSync(indexPath, indexContent);
            console.log('Router创建成功');
        }else {
            console.error('已经存在router文件夹')
        }
    }catch (e) {
        console.log('安装vue-router4.x失败')
    }
}

