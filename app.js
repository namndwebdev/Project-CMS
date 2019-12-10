const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const loginRoute = require('./api/user/loginRoute')
const userApi = require('./api/user/userRoute')
require('./configs/connectDb')
require('./configs/passport');
const postImg = require("./api/post/postImagesRouter");
const postText = require("./api/post/postRoute");
const postAvatar = require("./api/user/postAvatar")
const commentApi= require("./api/comment/commentRoute");
const authenEmail = require("./middleware/authenEmail");
const refreshToken = require('./api/token/refreshToken');
var cors = require('cors');
// const sendEmail = require("./middleware/authenEmail")
const app = express();
app.use(cors());
// view engine setup
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
//call api user
app.use('/api/user', userApi)
app.use('/api/login', loginRoute)
//call api post
app.use("/post-images",postImg);
app.use("/api/post", postText);
//call api comment
app.use('/api/post', commentApi);
//post avatar
app.use("/post-avatar", postAvatar);
app.use("/",authenEmail);
app.use("/",refreshToken);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
});

module.exports = app
