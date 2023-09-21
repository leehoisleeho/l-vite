#!/usr/bin/env node
import {program} from 'commander';
import {createVue,creteRouter} from './index.js'

program
    .option('--version, -V','查看版本')
    .action(() => {
        console.log('v 0.0.1')
    });

// 创建路由模板
program
    .command('router')
    .description('创建Router')
    .action(() => {
        creteRouter()
    });

// 创建vue模板
program
    .command('vue <name>')
    .description('创建vue模板')
    .action((name) => {
        createVue(name)
    });

program.parse();

