var request = require("request");
var cheerio = require("cheerio");
var movieModel = require('./models/cinemaMovies')



var arr = []
    ; (function cinemaId(i) {
        if (i == 10) {
            findCinemas();//查找电影院详情
            return;
        }
        request('https://maoyan.com/cinemas?offset=' + i * 12, function (err, result) {
            if (err) {
                console.log(err);
            }

            var $ = cheerio.load(result.body);
            $('div.cinema-cell').each(function (index, element) {
                var obj = {};
                obj.cinemaId = $(element).find('.cinema-info').find('a').attr('href').split("?")[0].substring(8)//获取电影院id            
                arr.push(obj)
            })
            cinemaId(i + 1)
        })
    })(0)


function findCinemas() {
    (function tofindCinemas(i) {
        var obj = {}
var movieIdArr = [];//电影id
var movieImgArr = [];//电影海报
var movieNameArr = [];//电影名称
var movieScoreArr = [];//电影评分
var movieTimeArr = [];//电影时长
var movieTypeArr = [];//电影类型
var movieActorArr = [];//电影主演
var movieShowArr = [];//电影观影时间
var movieWatchTimeArr = [];//电影观影具体时间

obj.movieId = movieIdArr
obj.movieImg = movieImgArr
obj.movieName = movieNameArr
obj.movieScore = movieScoreArr
obj.movieTime = movieTimeArr
obj.movieType = movieTypeArr
obj.movieActor = movieActorArr
obj.movieShow = movieShowArr
obj.movieWatchTime = movieWatchTimeArr
        if (i == arr.length) {
            console.log("全部导入成功！")
            return;
        }

        request('https://maoyan.com/cinema/' + arr[i].cinemaId, function (err, result) {
            if (err) {
                console.log(err);
            }
            var $ = cheerio.load(result.body);
            nameAndAddress();
            function nameAndAddress() {
                obj.cinemaId = arr[i].cinemaId;
                obj.cinemaName = $('.cinema-brief-container').find('.name').text();
                obj.cinemaAddress = $('.cinema-brief-container').find('.address').text();
                obj.cinemaTel = $('.cinema-brief-container').find('.telphone').text().split('：')[1];
                idAndImg()
            }

            //获取这些电影id+海报
            function idAndImg() {
                $('.movie-list .movie').each(function (index, element) {
                    var movieId = $(element).attr('data-movieid');
                    var movieImg = $(element).find('img').attr('src');
                    movieIdArr.push(movieId)
                    movieImgArr.push(movieImg)
                })
                movieInfos()
            }

            //获取这些电影信息
            function movieInfos() {
                $('.show-list').each(function (index, element) {
                    var movieName = $(element).find('.movie-info').find('.movie-name').text();//电影名称
                    var movieScore = $(element).find('.movie-info').find('.score').text();//电影评分
                    if (movieScore == undefined) movieScore = '暂无评分';
                    var movieTime = $(element).find('.movie-info').find('.movie-desc').find('.value').eq(0).text(); //电影时长
                    var movieType = $(element).find('.movie-info').find('.movie-desc').find('.value').eq(1).text(); //电影类型
                    var movieActor = $(element).find('.movie-info').find('.movie-desc').find('.value').eq(2).text() //电影主演

                    movieNameArr.push(movieName)
                    movieScoreArr.push(movieScore)
                    movieTimeArr.push(movieTime)
                    movieTypeArr.push(movieType)
                    movieActorArr.push(movieActor)
                })
                movieShowTime()
            }

            //获取这些电影的观影时间
            function movieShowTime() {
                $('.show-list .show-date').each(function (index, element) {
                    var movieShow = $(element).find('.date-item').text().replace(/周/g, '+周');//电影观影时间
                    var movieShow1 = movieShow.replace(/后/g, '+后');//电影观影时间
                    var movieShow2 = movieShow1.replace(/明/g, '+明').split("+");//电影观影时间
                    movieShowArr.push(movieShow2)
                })
                movieTimeWatch()
            }
            //获取这些电影的观影时间的放映时间
            function movieTimeWatch() {
                var tbody1 = $('.show-list').eq(0).find('tbody').eq(0);

                tbody1.find('tr').each(function (err, element) {
                    var obj = {}//每条
                    obj.beginTime = $(element).find('.begin-time').text();//开始放映时间
                    obj.endTime = $(element).find('.end-time').text()//结束时间
                    obj.language = $(element).find('.lang').text()//语言版本
                    obj.hall = $(element).find('.hall').text()//放映厅 stonefont
                    obj.price = 38

                    movieWatchTimeArr.push(obj);
                })
                addCinemaMovies()
            }
            function addCinemaMovies() {//添加影院的电影放映信息
                // var arr = [];
                // arr.push(obj)
                movieModel.addcinemaMovies(obj, (result) => {
                    // console.log("放映信息成功！")
                    tofindCinemas(i + 1)
                })
            }
        })
    })(0)
}


