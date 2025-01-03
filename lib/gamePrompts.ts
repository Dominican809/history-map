export const SYSTEM_PROMPT = `You are a Game Master running a historical leadership RPG. Your role is to:
1. Guide players through 4 historical scenarios of increasing complexity
2. Evaluate their decisions based on leadership qualities and their governance style
3. Provide realistic consequences with significant impact on KPIs (changes of 10-30 points)
4. Consider the player's governance tools settings heavily in your responses
5. Track and evaluate leadership skills
6. Maintain historical accuracy while being engaging

Game Rules:
- Present scenarios in order of increasing difficulty
- Each scenario should test different aspects of leadership
- Consider governance tools in your response:
  * High Law Enforcement (>70) should lead to more order but potential unrest
  * High Tax Policy (>70) increases revenue but decreases public support
  * High Military Presence (>70) improves security but strains resources
  * High Diplomatic Approach (>70) improves relations but may show weakness
- Evaluate responses based on: Strategy, Ethics, Communication, and Decision-making
- Provide dramatic feedback on decisions (significant KPI changes)
- After each response, provide updates in this format:
[KPI_UPDATE]{"publicSupport": X, "economicProsperity": Y, "politicalInfluence": Z, "provincialStability": W}[/KPI_UPDATE]
[SKILLS_UPDATE]{"communication": X, "initiative": Y, "strategicThinking": Z, "creativity": W}[/SKILLS_UPDATE]

At the end of all scenarios, provide a comprehensive leadership analysis that references their governance style and tool preferences.`

export const SCENARIOS = [
  // Stage 1: Basic Governance
  `Your first scenario takes place in Ancient Rome, 50 BCE:
You are a newly appointed governor of a Roman province. You've discovered that local tax collectors are demanding extra payments from farmers and keeping the excess for themselves. The tax collectors are well-connected politically, but the farmers are struggling to feed their families.

Current Province Status:
[KPI_UPDATE]{"publicSupport": 50, "economicProsperity": 60, "politicalInfluence": 70, "provincialStability": 65}[/KPI_UPDATE]
[SKILLS_UPDATE]{"communication": 50, "initiative": 50, "strategicThinking": 50, "creativity": 50}[/SKILLS_UPDATE]

Consider your governance approach carefully:
- Strict law enforcement might catch corrupt officials but could disrupt the tax system
- Generous tax policies could help farmers but reduce revenue
- Military presence could enforce order but intimidate civilians
- Diplomatic solutions might preserve relationships but take longer

Adjust your governance tools and explain how you'll handle this situation.`,

  // Stage 2: Crisis Management
  `Your success or struggle with the tax collectors has led to a new challenge:
A severe drought has hit the province, causing food shortages. Neighboring provinces are offering aid, but local merchants want to maintain high prices. The military garrison also needs supplies for an upcoming campaign.

Your governance tools will be crucial:
- Law enforcement could control price gouging but might create black markets
- Tax policy affects your ability to purchase aid
- Military presence could maintain order but consumes resources
- Diplomatic approach influences negotiations with neighbors

How do you balance these competing interests while maintaining stability?`,

  // Stage 3: External Relations
  `Word of your governance has spread:
A powerful neighboring tribe is requesting trading rights and settlement permissions within your province. This could bring prosperity but also risks cultural tensions and security concerns. The Senate is watching your handling of foreign relations closely.

Your governance style will shape the outcome:
- Law enforcement affects integration of newcomers
- Tax policy could encourage or discourage settlement
- Military presence might deter trouble but also create tension
- Diplomatic approach shapes tribal relations

How do you approach this diplomatic challenge?`,

  // Stage 4: Complex Crisis
  `Your final challenge tests everything you've learned:
A combination of political intrigue, natural disaster, and external threats has created a perfect storm. A senator is plotting against you, using recent events to question your leadership. Meanwhile, pirates are disrupting trade, and a religious movement is gaining influence among the people.

Your governance tools face their ultimate test:
- Law enforcement balances religious freedom with security
- Tax policy affects your crisis response resources
- Military presence divides between pirates and internal security
- Diplomatic approach influences both Senate and local relations

How do you demonstrate your leadership in this complex crisis?`
]

export type KPIState = {
  publicSupport: number
  economicProsperity: number
  politicalInfluence: number
  provincialStability: number
}

export type SkillsState = {
  communication: number
  initiative: number
  strategicThinking: number
  creativity: number
}

export type GovernanceTools = {
  lawEnforcement: number // 0-100: Lenient to Strict
  taxPolicy: number // 0-100: Generous to Demanding
  militaryPresence: number // 0-100: Minimal to Maximum
  diplomaticApproach: number // 0-100: Accommodating to Assertive
}

export type GameState = {
  currentStage: number
  currentScenario: string
  kpiState: KPIState
  skillsState: SkillsState
  governanceTools: GovernanceTools
  scenarioResponses: Array<{
    stage: number
    response: string
    kpiChanges: KPIState
    skillChanges: SkillsState
    toolSettings: GovernanceTools
  }>
  isComplete: boolean
  finalAnalysis: string | null
}

export const createNewGame = (): GameState => ({
  currentStage: 0,
  currentScenario: SCENARIOS[0],
  kpiState: {
    publicSupport: 50,
    economicProsperity: 60,
    politicalInfluence: 70,
    provincialStability: 65
  },
  skillsState: {
    communication: 50,
    initiative: 50,
    strategicThinking: 50,
    creativity: 50
  },
  governanceTools: {
    lawEnforcement: 50,
    taxPolicy: 50,
    militaryPresence: 50,
    diplomaticApproach: 50
  },
  scenarioResponses: [],
  isComplete: false,
  finalAnalysis: null
}) 