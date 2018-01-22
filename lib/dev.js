const pug = require('pug');
const path = require('path');
const express = require('express');
const webpack = require('webpack');

const webpackConfig = require('../webpack.config.js');
const entrys = webpackConfig.entry;

const compiler = webpack(webpackConfig);
const hotMiddleware = require('webpack-hot-middleware')(compiler);
const devMiddleware = require('webpack-dev-middleware')(compiler, {serverSideRender: true});
devMiddleware.waitUntilValid(e => require('opn')('http://localhost:3000').then(e => console.log('dev server listen 3000.')));

const app = express();
app.use(hotMiddleware);
app.use(devMiddleware);

app.use((req, res, next) => {
	console.log('entry ', req.url, '..');
	return next();
});

app.get('/*', (req, res) => {
	res.append('Content-Type', 'text/html; charset=utf-8');

	const html = pug.compileFile(path.resolve(__dirname, './templates/index.pug'));
	const locals = {title: 'antdx - React Components', demo_title: '请选择组件查看Demo.', scripts: []};
	const compname = req.url.split('/').pop();

	if(compname){
		locals.demo_title = `${compname}'s demo`;
		locals.scripts = ['https://unpkg.com/react@16/umd/react.production.min.js', 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js'];
		if(entrys[compname]){
			locals.scripts.push('/common_bundle.js', `/${compname}_bundle.js`, `/${compname}_demo_bundle.js`);
		}else{
			locals.demo_title = locals.demo_title + ' not found.'
		}
	}

	locals.components = Object.keys(entrys).filter(key => key.indexOf('_demo') === -1).map(comp => ({
		name: comp,
		demo: []
	}));
	
	res.end(html(locals));
});

app.listen(3000);

