#!/usr/bin/env node
import {program} from 'commander';
import method from './src/index.js'

program
    .option('--version, -V','查看版本')
    .action(() => {
        console.log('v 0.0.7')
    });

// 创建路由模板
program
    .command('router')
    .description('创建Router')
    .action(() => {
        method.creteRouter()
    });

// 创建vue模板
program
    .command('create <name>')
    .description('创建vue模板')
    .action((name) => {
        method.createVue(name)
    });

program.parse();

