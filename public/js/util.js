var util = {
    getID : function () {
        var id = '';
        var pathname = window.location.pathname;
        if(pathname.indexOf('/code/') === 0) 
            id = pathname.substring(6);
        return id;
    }
};