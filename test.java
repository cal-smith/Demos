import hello.Hello;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class test {
	public static void main (String[] args) {
		Hello earth = new Hello();
		System.out.println(earth.greet());
		files();
	}
	public static void files (){
		BufferedReader file = null;
		try {
			file = new BufferedReader(new FileReader("/Users/cal/Sites/Demos/static/static.txt"));
			String line;
			while ((line = file.readLine()) != null){
				System.out.println(line);
			}
			
		} catch (IOException e){
			e.printStackTrace();
		} finally {
			try{
				if (file != null) file.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
	}
}