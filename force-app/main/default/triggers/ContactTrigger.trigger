trigger ContactTrigger on Contact (after insert, after update, after delete) {
    List<Account> acts = new List<Account>();
    switch on Trigger.operationType {
        when AFTER_UPDATE {
            Set<Id> accountIds = new Set<Id>();
            for(Contact con : Trigger.new){
                Contact oldContact = Trigger.oldMap.get(con.Id);
                if(!String.isBlank(con.AccountId) && oldContact.Active__c != con.Active__c && con.AccountId == oldContact.AccountId){
                    accountIds.add(con.AccountId);
                    /*Contact oldContact = Trigger.oldMap.get(con.Id);
                    String actId = con.AccountId;
                    if(oldContact.Active__c == false && con.Active__c == true){
                    List<Contact> ac = [SELECT Id, AccountId, Active__c FROM Contact WHERE Active__c = true AND AccountId = :actId];
                    system.debug(ac);
                    Decimal activeCount = ac.size();
                    acts.add(new Account(Id=actId, Active_Contacts__c = activeCount));
                    } else if(oldContact.Active__c == true && con.Active__c == false){
                    List<Contact> ac = [SELECT Id, AccountId, Active__c FROM Contact WHERE Active__c = true AND AccountId = :actId];
                    system.debug(ac);
                    Decimal activeCount = ac.size();
                    acts.add(new Account(Id=actId, Active_Contacts__c = activeCount));
                    }*/
                } else if(!String.isBlank(con.AccountId) && !String.isBlank(oldContact.AccountId) && con.AccountId != oldContact.AccountId)
                    accountIds.add(con.AccountId);
                accountIds.add(oldContact.AccountId);
            }
            if(accountIds.size()>0){
                List<AggregateResult> contacts = [SELECT AccountId, COUNT(Id) idsCount FROM Contact WHERE AccountId IN :accountIds AND Active__c = true GROUP BY AccountId];
                for(AggregateResult contact : contacts){
                    String accountId = String.valueOf(contact.get('AccountId'));
                    Decimal activeCount = (Decimal)contact.get('idsCount');
                    acts.add(new Account(Id=accountId, Active_Contacts__c = activeCount));
                }
                system.debug(acts);
                update acts;
            }
            
        }
        when AFTER_INSERT {
            Set<Id> allAccounts = new Set<Id>();
            for(Contact con : Trigger.new){
                if(!String.isBlank(con.AccountId) && con.Active__c == true){
                    allAccounts.add(con.AccountId);
                }
            }
            List<AggregateResult> contacts = [SELECT AccountId, COUNT(Id) contactCount FROM Contact WHERE Active__c = true AND AccountId IN :allAccounts GROUP BY AccountId];
            for(AggregateResult res : contacts){
                Decimal activeCount = (Decimal)res.get('contactCount');
                String accountId = (String)res.get('AccountId');
                acts.add(new Account(Id=accountId, Active_Contacts__c = activeCount));
            }
            if(acts.size()>0){
                system.debug(acts);
                update acts;
            }
        }
        when AFTER_DELETE {
            for(Contact con : Trigger.new){
                system.debug(con);
                /*if(!String.isBlank(con.AccountId) && con.Active__c == true){
String actId = con.AccountId;
List<Contact> ac = [SELECT Id, AccountId, Active__c FROM Contact WHERE Active__c = true AND AccountId = :actId];
system.debug(ac);
Decimal activeCount = ac.size();
acts.add(new Account(Id=actId, Active_Contacts__c = activeCount));
if(acts.size()>0){
system.debug(acts);
update acts;
}
}*/
            }
            
        }
    }
}