trigger AccountAfterTrigger on Account (after insert) {
    List<Contact> contacts = new List<Contact>();
    for(Account act : Trigger.new){
        Contact c = new Contact();
        c.FirstName = 'ankit';
        c.LastName = 'singh';
        c.AccountId = act.Id;
        contacts.add(c);
    }
    insert contacts;
}