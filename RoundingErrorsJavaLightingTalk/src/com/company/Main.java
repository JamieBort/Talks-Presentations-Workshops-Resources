// from/for: The Java Lightning talk I gave here https://drive.google.com/drive/u/0/folders/1D5holGMchJkRQsX7mpBYyQPqMIAYJrHl

// From: https://stackoverflow.com/questions/960072/rounding-errors
// and: https://www.geeksforgeeks.org/rounding-off-errors-java/

package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        double a = 0.7;
        double b = 0.9;
        double x = a + 0.1;
        double y = b - 0.1;

        System.out.println("a = " + a); // We'll see: "x = " 0.7.
        System.out.println("b = " + b); // We'll see: "x = " 0.9.

        System.out.println("x = " + x); // We'll see: "x = " 0.7999999999999999.
        System.out.println("y = " + y ); // We'll see: "y = " 0.8.
    }
}


//System.out.println(x == y); // We'll see: false.
//        System.out.println(Math.abs(x - y) < 0.0001); // We'll see: true.


// From: https://blog.takipi.com/5-weird-java-questions-that-will-make-your-head-spin/
//        Prints out “true” for the first comparison and “false” for the next. This wouldn’t work for ints, but since Integers are separate objects it makes sense that c and d are not the same one. But why a == b?
//                The Integer type keeps a cache of all objects with a value in the range of -128 to 127 for performance reasons. So when you declare new variables in that range, you’re actually referring to the same object.

//        Integer e = 42;
//        Integer f = 42;
//        System.out.println(e == f);
//        Integer c = 666;
//        Integer d = 666;
//        System.out.println(c == d);



//        From: https://dzone.com/articles/programming-language-peculiarities-java-wat
//        We can see the LuckyNumber.getInstance() method returns an object of type LuckyNumber but is returning a value of null. So we would expect that accessing a member variable even if static would throw a NullPointerException. It does not, you’ve probably done something else that works in exactly the same way without even realizing it. When you test for instanceof and the value is null. It is still a class instance but with its value set to the special value null. So static methods that could be called without an instance can still be called upon it.

//        public class LuckyNumber {
//            static int luckyNumber = 21;
//            public static LuckyNumber getInstance() {
//                return null;
//            }
//            public static void main(String[] args) {
//                System.out.println(LuckyNumber.getInstance().luckyNumber);
//                System.out.println(LuckyNumber.getInstance().getInstance());
//            }
//        }

//    }
//}