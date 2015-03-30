AccountsTemplates.addField({
    _id: 'birthday',
    type: 'text',
    displayName: "Birthday",
    template:"birthdayInput"
});
AccountsTemplates.addField({
    _id: "gender",
    type: "select",
    required: true,
    displayName: "Gender",
    select: [
        {
            text: "Male",
            value: "male"
        },
        {
            text: "Female",
            value: "female"
        },
    ]
});