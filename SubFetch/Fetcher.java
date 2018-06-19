package SubFetch;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class Fetcher {
	private String SubsUrl;
    public String fetch(String args,String Lang) throws IOException {

        // Make a URL to the web page
        URL url = new URL(args);

        // Get the input stream through URL Connection
        URLConnection con = url.openConnection();
        con.setRequestProperty("User-Agent", "Chrome/23.0.1271.95");
        InputStream is =con.getInputStream();

        // Once you have the Input Stream, it's just plain old Java IO stuff.

        // For this case, since you are interested in getting plain-text web page
        // I'll use a reader and output the text content to System.out.

        // For binary content, it's better to directly read the bytes from stream and write
        // to the target file.


        BufferedReader br = new BufferedReader(new InputStreamReader(is));

        String line = null;

        // read each line and write to System.out
        int i = 0;
        while ((line = br.readLine()) != null) {
        	if(line.contains("./index.php?title")) {
               	line = line.trim();
            	 List list = getTagValues(line);
            	 String URLS = list.get(0).toString(); 
            	 URLS = URLS.replace("./", "\n");
            	 URLS = URLS.replace("\">>>Download<<</a> </b>&nbsp;&nbsp;", "<---$$-->");
            	 URLS = URLS.replace("<br><b><a href=\"", "");
            	 URLS = URLS.replace("index.php","https://downsub.com/index.php");
            	 URLS = URLS.trim();
            	 String Links[] = URLS.split("\n"); 
            	 Links[1]=Links[1].replace("<br><br/>Or translate from <b>English</b> to:<br/><b><a href=\"", "");
            	 for(String Link:Links) {
            		if(Link.contains(Lang)) {
            			Link = Link.replace("<---$$-->"+Lang, "");
            			this.SubsUrl = Link;
            			break;
            		}
            	 }
            	 break;
        	}
            i++;
        }
        
        return SubsUrl;
    }


	private static final Pattern TAG_REGEX = Pattern.compile("<b><a href=\"(.*)>>>Download<<</a> </b>");

	private static List<String> getTagValues(final String str) {
	    final List<String> tagValues = new ArrayList<String>();
	    final Matcher matcher = TAG_REGEX.matcher(str);
	    while (matcher.find()) {
	        tagValues.add(matcher.group(1));
	    }
		return tagValues;
	}
}
