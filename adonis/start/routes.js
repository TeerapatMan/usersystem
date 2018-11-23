'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')
const Database = use('Database')
var crypto = require('crypto');

const key = "abcdefg";
// const Blog = use('App/Models/Blog')

// Route.on('/').render('welcome')

// Route.post('/login', async ({ auth, request, response }) => {
//     let form = request.except(['_csrf'])
//     await auth.attempt(form.username, form.password)
//     return response.redirect('/blog/index')
// })

// Route.get('/logout', async ({ auth, response, view }) => {
//     await auth.logout()
//     return response.redirect('/blog/index')
// })

// Route.get('/blog/index', async ({ request, view }) => {
//     let blogs = await Blog.all()
//     blogs = blogs.toJSON()
//     return view.render('blogs.index', { blogs: blogs })
// })

// Route.get('/blog/create', async ({ view }) => {
//     //แสดง create blog
//     return view.render('blogs.create')
// })

// Route.get('/blog/edit', async ({ request, view }) => {
//     //แสดง edit blog form id
//     let id = request.get().id
//     let blog = await Blog.find(id)
//     return view.render('blogs.edit', { blog: blog })
// })

// Route.post('/blog/create', async ({ request, response }) => {
//     //เอาข้อมูลเก็บแล้วไปหน้า blog/index
//     let form = request.except(['_csrf'])
//     let blog = new Blog()
//     blog.fill(form)
//     await blog.save()
//     return response.redirect('/blog/index')
// })

// Route.post('/blog/edit', async ({ request, response }) => {
//     let form = request.except(['_csrf'])
//     let blog = await Blog.find(form.id)
//     blog.merge(form)
//     await blog.save()
//     return response.redirect('/blog/index')
// })

// Route.post('/blog/delete', async ({ request, response }) => {
//     let form = request.except(['_csrf'])
//     let blog = await Blog.find(form.id)
//     await blog.delete()
//     return response.redirect('/blog/index')
// })

Route.post('/auth/login', async ({ auth, request, response }) => {
    // let form = request.except(['_csrf'])
    // await auth.attempt(form.username, form.password)
    let data = {
        username: '',
        password: '',
        role: ''
    }
    data = request.all()
    let output = {};
    output['status'] = false;
    if (data.username && data.password) {
        if (!data.role) data.role = 'teacher';//defualt -> teacher : admin
        const users = await Database.from('users')
            .innerJoin('roles_users', function () {
                this.on('users.id', 'roles_users.user_id')
            })
            .innerJoin('roles', function () {
                this.on('roles_users.role_id', 'roles.id')
            })
            .where({ 'users.username': data.username, 'users.password': data.password, 'roles.name': data.role })
        if (users.length >= 1) {
            // users[0]['status'] = true;
            output['status'] = true;
            //sha256 key
            let hash = crypto.createHmac('sha256', key).update(JSON.stringify(users[0])).digest('hex');
            //json data
            let encoded = JSON.stringify(users[0]);
            //json data . sha256 key
            let token = new Buffer(encoded).toString('base64') + '.' + hash;
            output['token'] = token
        }else{
            output['status'] = false;
            output['msg'] = 'fail login.';
        }
    }
    return response.json(output);

    //     var encoded = new Buffer(url).toString('base64');
    // var decoded = new Buffer(encoded, 'base64').toString('ascii')

    // console.log(encoded);
    // console.log(decoded);
})


Route.post('/users', async ({ auth, request, response }) => {
    // let form = request.except(['_csrf'])
    // await auth.attempt(form.username, form.password)
    let data = {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        role: '',
        token: ''
    }
    data = request.all()
    let output = {};
    output['status'] = false;
    output['msg'] = 'fail params token.';
    if (!data.token) {
        return response.json(output);
    }

    let decodeToken = data.token.split('.');
    let decoded = new Buffer(decodeToken[0], 'base64').toString()
    let hash = crypto.createHmac('sha256', key).update(decoded).digest('hex');
    if (hash != decodeToken[1]) {
        output['status'] = false;
        output['msg'] = 'error params token.';
        return response.json(output);
    }

    delete data['token'];
    let role = data['role'];
    if (role == "teacher") {
        role = 1;
    } else role = 2;
    delete data['role'];
    let userId = await Database.table('users').insert(data)
    await Database.table('roles_users').insert({ role_id: role, user_id: userId })
    output['status'] = true;
    output['msg'] = 'Create user successfully.';
    return response.json(output);


    /*
        if(data.username && data.password){
            if(!data.role) data.role = 'teacher';//defualt -> teacher : admin
            const users = await Database.from('users')
            .innerJoin('roles_users', function () {
                this.on('users.id', 'roles_users.user_id')
            })
            .innerJoin('roles', function () {
                this.on('roles_users.role_id', 'roles.id')
            })
            .where({ 'users.username': data.username, 'users.password': data.password, 'roles.name': data.role })
            if(users.length >= 1){
                // users[0]['status'] = true;
                output['status'] = true;
                //sha256 key
                let hash = crypto.createHmac('sha256',key).update(JSON.stringify(users[0])).digest('hex');
                //json data
                let encoded = JSON.stringify(users[0]);
                //json data . sha256 key
                let token = new Buffer(encoded).toString('base64')+'.'+hash;
                output['token'] = token
            }
        }
        return response.json(output);
    
    //     var encoded = new Buffer(url).toString('base64');
    // var decoded = new Buffer(encoded, 'base64').toString('ascii')
    
    // console.log(encoded);
    // console.log(decoded);
    
    */
})


Route.get('/users', async ({ request, response }) => {
    let data = request.get()
    let output = {};
    output['status'] = false;
    output['msg'] = 'fail params token.';
    if (!data.token) {
        return response.json(output);
    }

    let decodeToken = data.token.split('.');
    let regex = / /gi;
    decodeToken[0] = decodeToken[0].replace(regex, '+');
    let decoded = new Buffer(decodeToken[0], 'base64').toString()
    let hash = crypto.createHmac('sha256', key).update(decoded).digest('hex');
    if (hash != decodeToken[1]) {
        output['status'] = false;
        output['msg'] = 'error params token.';
        return response.json(output);
    }

    let users = await Database.from('users')
        .select('users.id','users.username','users.firstname')
        .innerJoin('roles_users', function () {
            this.on('users.id', 'roles_users.user_id')
        })
        .where({ 'roles_users.role_id': 1 })

    output['status'] = true;
    output['users'] = users;
    output['msg'] = 'success';
    return response.json(output)
})

Route.get('/usersDelete', async ({ request, response }) => {
    let data = request.get()
    let output = {};
    output['status'] = false;
    output['msg'] = 'fail params token.';
    if (!data.token) {
        return response.json(output);
    }

    let decodeToken = data.token.split('.');
    let regex = / /gi;
    decodeToken[0] = decodeToken[0].replace(regex, '+');
    let decoded = new Buffer(decodeToken[0], 'base64').toString()

    let hash = crypto.createHmac('sha256', key).update(decoded).digest('hex');
    if (hash != decodeToken[1]) {
        output['status'] = false;
        output['msg'] = 'error params token.';
        return response.json(output);
    }
    let dataToken = JSON.parse(decoded)
    let role_id = dataToken.role_id
    if (role_id == 2) {
        await Database.table('roles_users').where('user_id', data.id).delete()
        await Database.table('users').where('id', data.id).delete()
        output['status'] = true;
        output['msg'] = 'Delete Successfully.';
    } else {
        output['status'] = false;
        output['msg'] = 'No permission.';
    }
    return response.json(output);


})

Route.put('/users', async ({ auth, request, response }) => {
    // let form = request.except(['_csrf'])
    // await auth.attempt(form.username, form.password)
    let data = {
        password: '',
        repassword: '',
        newpassword: '',
        token: ''
    }
    data = request.all()
    let output = {};
    output['status'] = false;
    output['msg'] = 'fail params token.';
    if (!data.token) {
        return response.json(output);
    }

    let decodeToken = data.token.split('.');
    let decoded = new Buffer(decodeToken[0], 'base64').toString()
    let hash = crypto.createHmac('sha256', key).update(decoded).digest('hex');
    if (hash != decodeToken[1]) {
        output['status'] = false;
        output['msg'] = 'error params token.';
        return response.json(output);
    }

    let dataToken = JSON.parse(decoded)
    if (data.newpassword == data.repassword && dataToken.password == data.password) {
        
        await Database.table('users').where('id', dataToken.id).update('password', data.newpassword)
        dataToken.password = data.newpassword
        //sha256 key
        let hash = crypto.createHmac('sha256', key).update(JSON.stringify(dataToken)).digest('hex');
        //json data
        let encoded = JSON.stringify(dataToken);
        //json data . sha256 key
        let token = new Buffer(encoded).toString('base64') + '.' + hash;
        output['status'] = true
        output['token'] = token;
        output['msg'] = 'Update Password successfully.';
        return response.json(output);
    }
    output['status'] = false;
    output['msg'] = 'fail password.';
    return response.json(output);
})