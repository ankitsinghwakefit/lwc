public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(Account account, String acctType, Integer limits) {
        return [SELECT Id,Name,Type FROM account WHERE Type=:acctType LIMIT :limits];
    }
    
    public static List<Account> insertAccounts(List<Account> accounts){
        insert accounts;
        return accounts;
    }
    
    public static Account insertAccount(Account account){
        insert account;
        return account;
    }
    
    public static List<Account> getAllAccounts(){
        return [SELECT Id,Name,Type FROM account];
    }
    
    public static void printAllAccounts(){
        List<Account> accounts = getAllAccounts();
        for(Account acct: accounts){
            System.debug(acct);
        }
    }
    
    public static void updateAvgResolutionDays(List<Id> actIds){
        Map<Id,Integer> totalCasesCount =new Map<Id,Integer>();
        Map<Id,Decimal> totalDaysCount =new Map<Id,Decimal>();
        Map<Id,Decimal> actDaysAvg = new Map<Id,Decimal>();
        List<Case> cases = [SELECT Id, CreatedDate, ClosedDate, AccountId FROM Case WHERE IsClosed=true AND AccountId= :actIds];
        for(Case ca: cases){
            if(totalCasesCount.containsKey(ca.AccountId)){
                Integer caseCount = totalCasesCount.get(ca.AccountId) + 1;
                totalCasesCount.put(ca.AccountId, caseCount);
                Decimal count = totalDaysCount.get(ca.AccountId) + (ca.ClosedDate.Date()).daysBetween(ca.CreatedDate.Date());
                totalDaysCount.put(ca.AccountId, count);
            } else {
                totalCasesCount.put(ca.AccountId, 1);
                totalDaysCount.put(ca.AccountId, (ca.ClosedDate.Date()).daysBetween(ca.CreatedDate.Date()));
            }
        }
        system.debug(actIds);
        system.debug(totalDaysCount);
        for(Id actId: totalCasesCount.keySet()){
            Decimal duration = totalDaysCount.get(actId)/totalCasesCount.get(actId);
            actDaysAvg.put(actId,duration);
        }
        List<Account> accts = new List<Account>();
        for(Id ac : actDaysAvg.keySet()) {
            accts.add(new Account(Id=ac, Avg_Case_Resolution_Days__c = actDaysAvg.get(ac)));
        }
        database.update(accts);
        system.debug(accts);

    }
    
    public static Integer getAccountSizeLength(){
        List<Account> accounts = getAllAccounts();
        return accounts.size();
    }
}