$(function () {
    // 初期設定
    $('#container').addClass('container');
    $('#container > div').addClass('item')
                         .addClass('width_50px')
                         .addClass('height_50px')
                         .css('font-size', '1rem');
    
    $('#item_a').css('background-color', '#0095d9');
    $('#item_b').css('background-color', '#b8d200');
    $('#item_c').css('background-color', '#884898');
    $('#item_d').css('background-color', '#ffd900');
    $('#item_e').css('background-color', '#d7003a');

    $("input[type='button']").addClass('ui-button')
                             .addClass('ui-widget')
                             .addClass('ui-corner-all')
                             .css('padding', '2px 10px')
                             .css('margin', '1px');

    $('span').css('color', 'red');


    $('#txtISZ').text('width: ' + $('#container div:first').css('width') + ' / height: ' + $('#container div:first').css('height'));

    //---------------------------------
    // container size
    //---------------------------------
    const clearCssCSZ = () => {
        $('#container').removeClass('width_270px');
        $('#container').removeClass('height_270px');
        $('#txtCSZ').text('');
    }

    $('#btnCSZ_0').click(function(){
        clearCssCSZ();
    });

    $('#btnCSZ_1').click(function(){
        $('#container').addClass('width_270px');
        let txtHeight = "";
        if ($('#container').css('height') === '270px') {
            // txtHeight = 'height: ' + $('#container').css('height');
            txtHeight = 'height: 270px';
        }
        // $('#txtCSZ').text('width: ' + $('#container').css('width') + ' / ' + txtHeight);
        $('#txtCSZ').text('width: 270px / ' + txtHeight);
    });

    $('#btnCSZ_2').click(function(){
        $('#container').addClass('height_270px');
        $('#txtCSZ').text('width: ' + $('#container').css('width') + ' / height: ' + $('#container').css('height'));
        let txtWidth = "";
        if ($('#container').css('width') === '270px') {
            // txtWidth = 'width: ' + $('#container').css('width');
            txtWidth = 'width: 270px';
        }
        // $('#txtCSZ').text(txtWidth + ' / ' + 'height: ' + $('#container').css('height'));
        $('#txtCSZ').text(txtWidth + ' / ' + 'height: 270px');
    });

    //---------------------------------
    // item size
    //---------------------------------
    const clearCssISZ = () => {
        $('#container > div').removeClass('width_50px');
        $('#container > div').removeClass('height_50px');
        $('#txtISZ').text('');
    }

    $('#btnISZ_0').click(function(){
        clearCssISZ();
    });

    $('#btnISZ_1').click(function(){
        $('#container > div').addClass('width_50px');
        let txtHeight = "";
        const divHeight = $('#container div:first').css('height');
        if ( divHeight === '50px') {
            // txtHeight = 'height: ' + divHeight;
            txtHeight = 'height: 50px';
        }
        // $('#txtISZ').text('width: ' + $('#container div:first').css('width') + ' / ' + txtHeight);
        $('#txtISZ').text('width: 50px / ' + txtHeight);
    });

    $('#btnISZ_2').click(function(){
        $('#container > div').addClass('height_50px');
        let txtWidth = "";
        const divWidth = $('#container div:first').css('width');
        if (divWidth === '50px') {
            // txtWidth = 'width: ' + divWidth;
            txtWidth = 'width: 50px';
        }
        // $('#txtISZ').text(txtWidth + ' / ' + 'height: ' + $('#container div:first').css('height'));
        $('#txtISZ').text(txtWidth + ' / ' + 'height: 50px');
    });

    //---------------------------------
    // font size
    //---------------------------------
    const clearCssFSZ = () => {
        $('#container > div').css('font-size', '1rem');
        $('#txtFSZ').text('');
    }
     
    $('#btnFSZ_0').click(function(){
        clearCssFSZ();
    });

    $('#btnFSZ_1').click(function(){
        $('#item_a').css('font-size', '1rem');
        $('#item_b').css('font-size', '2rem');
        $('#item_c').css('font-size', '3rem');
        $('#item_d').css('font-size', '1rem');
        $('#item_e').css('font-size', '2rem');

        const txtFSZ = 'A: ' + $('#item_a').css('font-size')
                  +  ' / B: ' + $('#item_b').css('font-size')
                  +  ' / C: ' + $('#item_c').css('font-size')
                  +  ' / D: ' + $('#item_d').css('font-size')
                  +  ' / E: ' + $('#item_e').css('font-size');

        $('#txtFSZ').text(txtFSZ);
    });


    //---------------------------------
    // flex-direction
    //---------------------------------
    const clearCssFD = () => {
        $('#container').removeClass('fd_row');
        $('#container').removeClass('fd_row-reverse');
        $('#container').removeClass('fd_column');
        $('#container').removeClass('fd_column-reverse');
        $('#txtFD').text('');
    }

    $('#btnFD_0').click(function(){
        clearCssFD();
    });

    $('#btnFD_1').click(function(){
        clearCssFD();
        $('#container').addClass('fd_row');
        $('#txtFD').text('row');
    });

    $('#btnFD_2').click(function(){
        clearCssFD();
        $('#container').addClass('fd_row-reverse');
        $('#txtFD').text('row-reverse');
    });

    $('#btnFD_3').click(function(){
        clearCssFD();
        $('#container').addClass('fd_column');
        $('#txtFD').text('column');
    });

    $('#btnFD_4').click(function(){
        clearCssFD();
        $('#container').addClass('fd_column-reverse');
        $('#txtFD').text('column-reverse');
    });


    //---------------------------------
    // flex-wrap
    //---------------------------------
    const clearCssFW = () => {
        $('#container').removeClass('fw_nowrap');
        $('#container').removeClass('fw_wrap');
        $('#container').removeClass('fw_wrap-reverse');
        $('#txtFW').text('');
    }

    $('#btnFW_0').click(function(){
        clearCssFW();
    });

    $('#btnFW_1').click(function(){
        clearCssFW();
        $('#container').addClass('fw_nowrap');
        $('#txtFW').text('nowrap');
    });

    $('#btnFW_2').click(function(){
        clearCssFW();
        $('#container').addClass('fw_wrap');
        $('#txtFW').text('wrap');
    });

    $('#btnFW_3').click(function(){
        clearCssFW();
        $('#container').addClass('fw_wrap-reverse');
        $('#txtFW').text('wrap-reverse');
    });


    //---------------------------------
    // flex-flow（flex-direction + flex-wrap）
    //---------------------------------


    //---------------------------------
    // justify-content
    //---------------------------------
    const clearCssJC = () => {
        $('#container').removeClass('jc_flex-start');
        $('#container').removeClass('jc_flex-end');
        $('#container').removeClass('jc_center');
        $('#container').removeClass('jc_space-between');
        $('#container').removeClass('jc_space-around');
        $('#txtJC').text('');
    }

    $('#btnJC_0').click(function(){
        clearCssJC();
    });

    $('#btnJC_1').click(function(){
        clearCssJC();
        $('#container').addClass('jc_flex-start');
        $('#txtJC').text('flex-start');
    });

    $('#btnJC_2').click(function(){
        clearCssJC();
        $('#container').addClass('jc_flex-end');
        $('#txtJC').text('flex-end');
    });

    $('#btnJC_3').click(function(){
        clearCssJC();
        $('#container').addClass('jc_center');
        $('#txtJC').text('center');
    });

    $('#btnJC_4').click(function(){
        clearCssJC();
        $('#container').addClass('jc_space-between');
        $('#txtJC').text('space-between');
    });

    $('#btnJC_5').click(function(){
        clearCssJC();
        $('#container').addClass('jc_space-around');
        $('#txtJC').text('space-around');
    });


    //---------------------------------
    // align-items
    //---------------------------------
    const clearCssAI = () => {
        $('#container').removeClass('ai_stretch');
        $('#container').removeClass('ai_flex-start');
        $('#container').removeClass('ai_flex-end');
        $('#container').removeClass('ai_center');
        $('#container').removeClass('ai_baseline');
        $('#txtAI').text('');
    }

    $('#btnAI_0').click(function(){
        clearCssAI();
    });

    $('#btnAI_1').click(function(){
        clearCssAI();
        $('#container').addClass('ai_stretch');
        $('#txtAI').text('stretch');
    });

    $('#btnAI_2').click(function(){
        clearCssAI();
        $('#container').addClass('ai_flex-start');
        $('#txtAI').text('flex-start');
    });

    $('#btnAI_3').click(function(){
        clearCssAI();
        $('#container').addClass('ai_flex-end');
        $('#txtAI').text('flex-end');
    });

    $('#btnAI_4').click(function(){
        clearCssAI();
        $('#container').addClass('ai_center');
        $('#txtAI').text('center');
    });

    $('#btnAI_5').click(function(){
        clearCssAI();
        $('#container').addClass('ai_baseline');
        $('#txtAI').text('baseline');
    });


    //---------------------------------
    // align-content
    //---------------------------------
    const clearCssAC = () => {
        $('#container').removeClass('ac_stretch');
        $('#container').removeClass('ac_flex-start');
        $('#container').removeClass('ac_flex-end');
        $('#container').removeClass('ac_center');
        $('#container').removeClass('ac_space-between');
        $('#container').removeClass('ac_space-around');
        $('#txtAC').text('');
    }

    $('#btnAC_0').click(function(){
        clearCssAC();
    });

    $('#btnAC_1').click(function(){
        clearCssAC();
        $('#container').addClass('ac_stretch');
        $('#txtAC').text('stretch');
    });

    $('#btnAC_2').click(function(){
        clearCssAC();
        $('#container').addClass('ac_flex-start');
        $('#txtAC').text('flex-start');
    });

    $('#btnAC_3').click(function(){
        clearCssAC();
        $('#container').addClass('ac_flex-end');
        $('#txtAC').text('flex-end');
    });

    $('#btnAC_4').click(function(){
        clearCssAC();
        $('#container').addClass('ac_center');
        $('#txtAC').text('center');
    });

    $('#btnAC_5').click(function(){
        clearCssAC();
        $('#container').addClass('ac_space-between');
        $('#txtAC').text('space-between');
    });

    $('#btnAC_6').click(function(){
        clearCssAC();
        $('#container').addClass('ac_space-around');
        $('#txtAC').text('space-around');
    });


    //---------------------------------
    // order
    //---------------------------------
    const clearCssOD = () => {
        $('#container > div').removeClass('order_1');
        $('#container > div').removeClass('order_2');
        $('#container > div').removeClass('order_3');
        $('#container > div').removeClass('order_4');
        $('#container > div').removeClass('order_5');
        $('#txtOD').text('');
    }

    $('#btnOD_0').click(function(){
        clearCssOD();
    });

    $('#btnOD_1').click(function(){
        clearCssOD();
        $('#item_a').addClass('order_5');
        $('#item_b').addClass('order_2');
        $('#item_c').addClass('order_1');
        $('#item_d').addClass('order_3');
        $('#item_e').addClass('order_4');
        $('#txtOD').text('1-C 2-B 3-D 4-E 5-A');
    });

    //---------------------------------
    // flex-grow
    //---------------------------------
    const clearCssFG = () => {
        $('#container > div').removeClass('flex-grow_1');
        $('#container > div').removeClass('flex-grow_2');
        $('#container > div').removeClass('flex-grow_3');
        $('#container > div').removeClass('flex-grow_4');
        $('#txtFG').text('');
    }

    $('#btnFG_0').click(function(){
        clearCssFG();
    });

    $('#btnFG_1').click(function(){
        clearCssFG();
        $('#item_a').addClass('flex-grow_3');
        $('#item_b').addClass('flex-grow_1');
        $('#item_c').addClass('flex-grow_4');
        $('#item_d').addClass('flex-grow_2');
        $('#item_e').addClass('flex-grow_3');
        $('#txtFG').text('A-3 B-1 C-4 D-2 E-3');
    });


    //---------------------------------
    // flex-shrink
    //---------------------------------
    const clearCssFS = () => {
        $('#container > div').removeClass('flex-shrink_1');
        $('#container > div').removeClass('flex-shrink_2');
        $('#container > div').removeClass('flex-shrink_3');
        $('#container > div').removeClass('flex-shrink_4');
        $('#txtFS').text('');
    }

    $('#btnFS_0').click(function(){
        clearCssFS();
    });

    $('#btnFS_1').click(function(){
        clearCssFS();
        $('#item_a').addClass('flex-shrink_3');
        $('#item_b').addClass('flex-shrink_1');
        $('#item_c').addClass('flex-shrink_4');
        $('#item_d').addClass('flex-shrink_2');
        $('#item_e').addClass('flex-shrink_3');
        $('#txtFS').text('A-3 B-1 C-4 D-2 E-3');
    });

    //---------------------------------
    // flex-basis
    //---------------------------------
    const clearCssFB = () => {
        $('#container > div').removeClass('flex-basis_auot');
        $('#container > div').removeClass('flex-basis_20pc');
        $('#container > div').removeClass('flex-basis_30pc');
        $('#container > div').removeClass('flex-basis_40pc');
        $('#container > div').removeClass('flex-basis_80px');
        $('#txtFB').text('');
    }

    $('#btnFB_0').click(function(){
        clearCssFB();
    });

    $('#btnFB_1').click(function(){
        clearCssFB();
        $('#item_a').addClass('flex-basis_30pc');
        $('#item_b').addClass('flex-basis_auto');
        $('#item_c').addClass('flex-basis_40pc');
        $('#item_d').addClass('flex-basis_80px');
        $('#item_e').addClass('flex-basis_20pc');
        $('#txtFB').text('A-30% B-auto C-40% D-80px E-20%');
    });

    //---------------------------------
    // flex
    //---------------------------------
    //---------------------------------
    // align-self
    //---------------------------------
    const clearCssAS = () => {
        $('#container > div').removeClass('as_auto');
        $('#container > div').removeClass('as_flex-start');
        $('#container > div').removeClass('as_flex-end');
        $('#container > div').removeClass('as_center');
        $('#container > div').removeClass('as_baseline');
        $('#container > div').removeClass('as_stretch');
        $('#txtAS').text('');
    }

    $('#btnAS_0').click(function(){
        clearCssAS();
    });

    $('#btnAS_1').click(function(){
        clearCssAS();
        $('#container > div').addClass('as_auto');
        $('#txtAS').text('auto');
    });

    $('#btnAS_2').click(function(){
        clearCssAS();
        $('#container > div').addClass('as_flex-start');
        $('#txtAS').text('flex-start');
    });

    $('#btnAS_3').click(function(){
        clearCssAS();
        $('#container > div').addClass('as_flex-end');
        $('#txtAS').text('flex-end');
    });

    $('#btnAS_4').click(function(){
        clearCssAS();
        $('#container > div').addClass('as_center');
        $('#txtAS').text('center');
    });

    $('#btnAS_5').click(function(){
        clearCssAS();
        $('#container > div').addClass('as_baseline');
        $('#txtAS').text('baseline');
    });

    $('#btnAS_6').click(function(){
        clearCssAS();
        $('#container > div').addClass('as_stretch');
        $('#txtAS').text('stretch');
    });

});
