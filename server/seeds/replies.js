exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('replies').del()
  await knex('replies').insert([
    { id: 1, order: 1, intent: 'greeting', type: 'text', text: 'Hi! I hope you are doing well today. I am a bot, and I know how to talk about: the weather' },
    { id: 2, order: 1, intent: 'weather', type: 'text', text: "It's sunny outside here today. What is the weather like where you are?" },
  ]);
};
