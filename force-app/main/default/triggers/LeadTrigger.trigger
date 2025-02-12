trigger LeadTrigger on Lead (before insert, after insert, before update, after update) {
    switch on Trigger.operationType {
        when BEFORE_INSERT{
            LeadTriggerController.handleBeforeInsert(Trigger.new);
        }
        when AFTER_INSERT {
            LeadTriggerController.handleAfterInsert(Trigger.new);
        }
        when BEFORE_UPDATE {
            LeadTriggerController.handleBeforeUpdate(Trigger.new, Trigger.oldMap);
        }
    }
}