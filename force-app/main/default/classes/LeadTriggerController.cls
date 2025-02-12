public class LeadTriggerController {
    public static boolean isExecuted = false;
    public static void handleBeforeInsert(List<Lead> leads){
        for(Lead lead : leads){
            if(String.isBlank(lead.LeadSource)){
                lead.LeadSource = 'Other';
            }
            if(String.isBlank(lead.Industry)){
                lead.addError('please select a industry');
            }
        }
    }
    public static void handleAfterInsert(List<Lead> leads){
        List<Task> tasks = new List<Task>();
        for(Lead lead : leads){
            tasks.add(new Task(Subject='follow up on new lead created', WhoId=lead.Id));
        }
        insert tasks;
        if(!LeadTriggerController.isExecuted){
            LeadTriggerController.isExecuted = true;
            Lead ab = new Lead(LastName='follow up on new hgfhgf lead created', Company='tcs', Industry='Banking');
        	insert ab;
        }
    }
    public static void handleBeforeUpdate(List<Lead> leads, Map<Id,Lead> oldLeads){
        for(Lead lead : leads){
            if(String.isBlank(lead.LeadSource)){
                lead.LeadSource = 'Other';
            }
            Lead old = oldLeads.get(lead.Id);
            if(old.Status == 'Open - Not Contacted'){
                if(lead.Status == 'Closed - Converted' ||  lead.Status == 'Closed - Not Converted'){
                    lead.addError('lead status can not be closed until it is worked.');
                }
            }
        }
    }
}