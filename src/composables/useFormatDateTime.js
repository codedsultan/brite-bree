export default function useFormatDateTime() {
    function formatDateTime(dateString) {
        let date_ob = new Date(dateString);

        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);
        
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        
        // current year
        let year = date_ob.getFullYear();
        
        // current hours
        let hours = date_ob.getHours();
        
        // current minutes
        let minutes = date_ob.getMinutes();
        minutes = minutes < 10 ? '0'+minutes : minutes;
        // current seconds
        let seconds = date_ob.getSeconds();
        
        // prints date & time in YYYY-MM-DD HH:MM:SS format
        return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

    }

    function getTime(dateString) {
        let date_ob = new Date(dateString);

        // adjust 0 before single digit date
        // let date = ("0" + date_ob.getDate()).slice(-2);
        
        // current month
        // let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        
        // current year
        // let year = date_ob.getFullYear();
        
        // current hours
        let hours = date_ob.getHours();
        
        // current minutes
        let minutes = date_ob.getMinutes();
        minutes = minutes < 10 ? '0'+minutes : minutes;
        // current seconds
        // let seconds = date_ob.getSeconds();
        
        // prints date & time in YYYY-MM-DD HH:MM:SS format
        return ( hours + ":" + minutes );

    }

    return { formatDateTime, getTime }
}
