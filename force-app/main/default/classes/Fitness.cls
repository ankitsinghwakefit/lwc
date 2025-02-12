public class Fitness {
    public static Decimal calculateBMI(decimal weight, decimal height){
        return weight/(height*height);
    }
    public static Decimal calculatePace(decimal kms, decimal duration){
        return (kms*60)/duration;
    }
}