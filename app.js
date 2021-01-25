const express =require('express')
const dotenv = require('dotenv')
const path = require('path')
//Load Config
dotenv.config({path:'./config/config.env'})
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
connectDB()
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

//Sessions

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))

  //Passport Config
  require('./config/passport')(passport)
//HandleBars
app.engine('.hbs',exphbs({defaultLayout:'main',extname:'.hbs'}));
app.set('view engine','.hbs')


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session())
//Routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))

const PORT= process.env.PORT || 5000;
//Define which folder u want to use as static
app.use(express.static(path.join(__dirname,'public')))
app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
