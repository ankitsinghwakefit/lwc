trigger AccountBeforeTrigger on Account (before insert) {
    for(Account acc : Trigger.new){
        acc.Active__c = 'Yes';
    }
}