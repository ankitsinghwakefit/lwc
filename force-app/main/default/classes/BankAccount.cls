public class BankAccount {
	private Decimal accountBalance = 0;
    private static Decimal combinedBalance = 0;
    public void deposite(Decimal amount){
        accountBalance += amount;
        combinedBalance += amount;
    }
    public void withdrawl(Decimal amount){
        accountBalance -= amount;
         combinedBalance -= amount;
    }
    public Decimal getBalance(){
        return accountBalance;
    }
    public static Decimal getCombinedBalance(){
        return combinedBalance;
    }
}