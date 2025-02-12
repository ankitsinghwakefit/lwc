public class BatchOnContacts implements Database.Batchable<sObject> {
    public Id acctId;
    public BatchOnContacts(Id accountId){
        this.acctId = accountId;
    }
	public Database.QueryLocator start(Database.BatchableContext bc) {
        String query = 'SELECT Id, Name, BillingStreet, BillingCity, (SELECT Id,Name,MailingStreet, MailingCity FROM Contacts) FROM Account WHERE Id =:acctId';
        return Database.getQueryLocator(query);
    }
    public void execute(Database.BatchableContext bc, List<Account> accounts){
        List<Contact> contacts = new List<Contact>();
        for(Account ac : accounts){
            for(Contact con : ac.Contacts){
                contacts.add(new Contact(Id=con.Id, MailingStreet=ac.BillingStreet, MailingCity=ac.BillingCity));
            }
        }
        update contacts;
    }
    public void finish(Database.BatchableContext bc){
        // execute any post-processing operations
        system.debug('done...');
    }
}