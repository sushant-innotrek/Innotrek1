package SubFetch;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;



public class FileDownloader {
	    public void download(String url,String file,String Lang) {
	        try {
	            downloadUsingStream(url, "Subtitles/"+Lang+"_"+file+".srt");
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    }

	    private void downloadUsingStream(String urlStr, String file) throws IOException{
	        URL url = new URL(urlStr);
	        URLConnection con = url.openConnection(); 
            con.setRequestProperty("User-Agent", "Chrome/23.0.1271.95"); 
            BufferedInputStream bis = new BufferedInputStream(con.getInputStream());
	        FileOutputStream fis = new FileOutputStream(file);
	        byte[] buffer = new byte[1024];
	        int count=0;
	        while((count = bis.read(buffer,0,1024)) != -1)
	        {
	            fis.write(buffer, 0, count);
	        }
	        fis.close();
	        bis.close();
	    }

//	    private static void downloadUsingNIO(String urlStr, String file) throws IOException {
//	        URL url = new URL(urlStr);
//	        ReadableByteChannel rbc = Channels.newChannel(url.openStream());
//	        FileOutputStream fos = new FileOutputStream(file);
//	        fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
//	        fos.close();
//	        rbc.close();
//	    }
}
