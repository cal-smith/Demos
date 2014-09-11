package hello;

public class Hello {

	private String planet = "World";

	public Hello(String planet) {
		//this.planet = planet == null ? "World" : planet;
		this.planet = planet;
	}

	public Hello(){
		//overload for default planet value
	}

	public String greet(){
		String greeting = "Hello, " + planet;
		return greeting;
	}
}