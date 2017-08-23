/**
 * Created by Administrator on 2017/5/5 0005.
 */
import $ from 'jquery'
let handleScroll = (offsetTop,$node) => {
    let navH = offsetTop;
    //滚动条事件
    $(window).scroll(function(){
        //获取滚动条的滑动距离
        let scroH = $(this).scrollTop();
        if(scroH>=navH){
            $node.css({"position":"fixed","top":0,"left":"50%","margin-left":"-630px","z-index":9});
            $('#takeplace').show();
        }else if(scroH<navH){
            $node.css({"position":"static","margin":"0 auto"});
            $('#takeplace').hide();
        }
    })
}

export default handleScroll;