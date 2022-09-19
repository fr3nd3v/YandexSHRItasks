const htmlFragment = `

<style type="text/css">
        
.card__bg{
    padding: 16px;
}
.card__title{
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 16px;
}
.card__wrapper{
    display: flex;
}
.card{
   background: #F8F8F8;
   border-radius: 24px;
   padding: 16px;
   margin-right: 16px;
}
.card:last-child{
    margin-right: 0;
}

.card__img{
    margin: 0 auto;

    border-radius: 16px;
    background: #C4C4C4;
    margin-bottom: 16px;
}
.card__btn{
    margin: 0 auto;
    background: #FFFFFF;
    border-radius: 10px;
    padding: 10px 54px;
    font-weight: 400;
    font-size: 12px;
}
</style>
<section class="card__bg">

<div class="card__main">
    <div class="card__title">Список товаров</div>
    <div class="card__wrapper">
        <div class="card">
            <div class="card__img"></div>
            <div class="card__btn">Купить</div>
        </div>
        <div class="card">
            <div class="card__img"></div>
            <div class="card__btn">Купить</div>
        </div>
        <div class="card">
            <div class="card__img"></div>
            <div class="card__btn">Купить</div>
        </div>
    </div>
</div>
</section>`

module.exports = function () {
    return htmlFragment;
};
