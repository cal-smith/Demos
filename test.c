#include <stdio.h>

char test()
{
	return "test";
}

int main(int argc, char const *argv[])
{
	printf("%s\n", "Hello World");
	printf("%c\n", test());
}