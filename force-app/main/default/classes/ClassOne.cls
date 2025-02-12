public class ClassOne {
	public Integer startIndex = 0;
    public Integer one = 1;
    public static Integer getNextNum(Integer one, Integer two){
        return one+two;
    }
    public static void getSeries(Integer length){
        for(Integer i = 1; i<=length; i++){
            Integer ab = ClassOne.getNextNum(0,1);
            system.debug(ClassOne.getNextNum(0,1));
        }
    }
    public static List<Contact> getContacts(){
       return [
           SELECT Account.Name, Account.Rating, Name, Department, Title, (SELECT CaseNumber, Subject FROM Cases) FROM Contact
       ];
    }
}