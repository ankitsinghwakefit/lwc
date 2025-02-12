public class FutureOnLead {
    @future
    public static void updateLeadSource(){
        Lead lead = [SELECT Id, Name, LeadSource FROM Lead WHERE Id = '00QdL00000EQXsJUAX'];
        lead.LeadSource = 'Web';
        update lead;
        system.debug(lead);
    }
}