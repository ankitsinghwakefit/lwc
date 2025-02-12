public class OpportunityController {
    public static void updateProfile(List<Id> ids){
        //List<Opportunity> ops = new List<Opportunity>();
        List<Opportunity> ops = [SELECT Id, Name, Amount FROM Opportunity WHERE Id IN :ids];
        for(Opportunity op : ops){
            //Opportunity op = [SELECT Id, Name, Amount FROM Opportunity WHERE Id = :id];
            if(op.Amount > 50000){
                op.Profile__c = 'High';
            } else if(op.Amount > 10000 && op.Amount < 50000){
                op.Profile__c = 'Medium';
            } else if(op.Amount > 1 && op.Amount < 10000){
                op.Profile__c = 'Low';
            } else {
                op.Profile__c = '';
            }
            //ops.add(op);
            
        }
        update ops;
    }
}