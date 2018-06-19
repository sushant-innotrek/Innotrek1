package SubFetch;
import java.io.IOException;

public class Collector {
	public static void main(String args[]) throws IOException {
			String Youtube = args[0];
			String YID = args[0].split("v=")[1];
			String Lang = args[1];
			
			YID = YID.subSequence(0, 11).toString();
			// Youtube = Youtube.replace(":", "%3A");
			// Youtube = Youtube.replace("/", "%2F");
			// Youtube = Youtube.replace("?", "%3F");
			// Youtube = Youtube.replace("=", "%3D");
			
			Youtube="https://downsub.com/?url=" + Youtube;
			Fetcher F = new Fetcher();
			FileDownloader FD = new FileDownloader();
			System.out.println(YID);
			FD.download(F.fetch(Youtube,Lang),YID,Lang);
	}
	
	
}
