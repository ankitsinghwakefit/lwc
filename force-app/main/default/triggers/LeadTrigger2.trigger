trigger LeadTrigger2 on Lead (before insert, before update) {
    for(Lead lead : Trigger.new){
        if(String.isBlank(lead.Rating)){
            lead.Rating = 'Warm';
            system.debug('rating trigger');
        }
    }
}