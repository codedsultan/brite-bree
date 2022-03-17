export default function useFormatAMPM() {
    function formatAMPM(time) {
        var date = time.split(":")
        var hours = date[0]
        hours = hours.slice(-2)
        var minutes = date[1]
        var ampm = hours >= 12 ? "pm" : "am"     
        if( hours >= 12)
        {hours = hours % 12}
        // else{ hours = hours.slice(-2)}
        hours = hours ? hours : 12 // the hour '0' should be '12'
        var strTime = hours + ":" + minutes + " " + ampm
        return strTime
    }

    function format24(time) {
        var date = time.split(":")
        var hours = date[0]
        var minutes = date[1]
        hours = hours.slice(-2)
        var strTime = hours + ":" + minutes 
        return strTime
    }
    return { formatAMPM , format24}
}

// function formatAMPM(time) {
//     var date = new Date(time).getTime();
//     var hours = date.getHours();
//     var minutes = date.getMinutes();
//     var ampm = hours >= 12 ? 'pm' : 'am';
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'
//     minutes = minutes < 10 ? '0'+minutes : minutes;
//     var strTime = hours + ':' + minutes + ' ' + ampm;
//     return strTime;
//   }

// return { formatAMPM }
