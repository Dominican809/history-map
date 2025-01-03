"use client"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { SYSTEM_PROMPT, SCENARIOS, createNewGame, type GameState, type KPIState, type SkillsState, type GovernanceTools } from '@/lib/gamePrompts'
import { config } from '@/lib/config'

type Message = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

const formatMessage = (content: string) => {
  return content
    .replace(/\[KPI_UPDATE\].*?\[\/KPI_UPDATE\]/g, '')
    .replace(/\[SKILLS_UPDATE\].*?\[\/SKILLS_UPDATE\]/g, '')
    .split('\n')
    .map((line, i) => line.trim())
    .filter(line => line.length > 0)
    .map((line, i, arr) => {
      if (line.endsWith(':') && i < arr.length - 1) {
        return `<strong>${line}</strong>`
      }
      return line
    })
    .join('<br />')
}

const KPIDisplay = ({ kpis }: { kpis: KPIState }) => (
  <div className="w-72 glass-effect rounded-lg shadow-lg p-6 animate-glow">
    <h3 className="text-lg font-semibold mb-6 text-blue-400">Province Status</h3>
    <div className="space-y-6">
      {Object.entries(kpis).map(([key, value]) => (
        <div key={key}>
          <div className="flex justify-between mb-2">
            <span className="text-sm capitalize text-gray-300">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            <span className="text-sm font-medium text-blue-400">{value}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
)

const SkillsDisplay = ({ skills }: { skills: SkillsState }) => (
  <div className="w-72 glass-effect rounded-lg shadow-lg p-6 animate-glow">
    <h3 className="text-lg font-semibold mb-6 text-blue-400">Leadership Skills</h3>
    <div className="space-y-6">
      {Object.entries(skills).map(([key, value]) => (
        <div key={key}>
          <div className="flex justify-between mb-2">
            <span className="text-sm capitalize text-gray-300">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            <span className="text-sm font-medium text-blue-400">{value}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
)

const GovernanceTools = ({ 
  tools, 
  onChange 
}: { 
  tools: GovernanceTools
  onChange: (key: keyof GovernanceTools, value: number) => void
}) => (
  <div className="w-72 glass-effect rounded-lg shadow-lg p-6 animate-glow">
    <h3 className="text-lg font-semibold mb-6 text-blue-400">Governance Approach</h3>
    <div className="space-y-6">
      {Object.entries(tools).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium capitalize text-gray-300">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span className="text-sm font-medium text-blue-400">
              {value < 30 ? 'Lenient' : value < 70 ? 'Balanced' : 'Strict'}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(key as keyof GovernanceTools, parseInt(e.target.value))}
            className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Lenient</span>
            <span>Strict</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const GameSummary = ({ gameState }: { gameState: GameState }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 backdrop-blur-sm">
    <div className="glass-effect rounded-xl shadow-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-float">
      <h2 className="text-3xl font-bold mb-6 text-blue-400">Leadership Journey Analysis</h2>
      
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-100">Final Evaluation</h3>
        <p className="text-gray-300 whitespace-pre-line">{gameState.finalAnalysis}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Leadership Skills Progress</h3>
          <SkillsDisplay skills={gameState.skillsState} />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4">Province Management</h3>
          <KPIDisplay kpis={gameState.kpiState} />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Scenario History</h3>
        <div className="space-y-4">
          {gameState.scenarioResponses.map((response, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Stage {response.stage + 1}</h4>
              <p className="text-gray-700 mb-2">{response.response}</p>
              <div className="text-sm text-gray-500">
                Tool Settings: {Object.entries(response.toolSettings)
                  .map(([key, value]) => `${key}: ${value}%`)
                  .join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button onClick={() => window.location.reload()}>
          Start New Game
        </Button>
      </div>
    </div>
  </div>
)

export default function PuzzleGames() {
  const [isChatStarted, setIsChatStarted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const updateGameState = (content: string) => {
    if (!gameState) return

    // Update KPIs
    const kpiMatch = content.match(/\[KPI_UPDATE\](.*?)\[\/KPI_UPDATE\]/);
    const skillsMatch = content.match(/\[SKILLS_UPDATE\](.*?)\[\/SKILLS_UPDATE\]/);

    try {
      if (kpiMatch) {
        const kpiUpdate = JSON.parse(kpiMatch[1]);
        if (gameState.currentStage < SCENARIOS.length - 1) {
          setGameState(prev => prev ? {
            ...prev,
            kpiState: kpiUpdate
          } : null);
        }
      }

      if (skillsMatch) {
        const skillsUpdate = JSON.parse(skillsMatch[1]);
        if (gameState.currentStage < SCENARIOS.length - 1) {
          setGameState(prev => prev ? {
            ...prev,
            skillsState: skillsUpdate
          } : null);
        }
      }

      // Store response
      const cleanResponse = content.replace(/\[KPI_UPDATE\].*?\[\/KPI_UPDATE\]/g, '')
        .replace(/\[SKILLS_UPDATE\].*?\[\/SKILLS_UPDATE\]/g, '');

      setGameState(prev => prev ? {
        ...prev,
        scenarioResponses: [
          ...prev.scenarioResponses,
          {
            stage: prev.currentStage,
            response: cleanResponse,
            kpiChanges: kpiMatch ? JSON.parse(kpiMatch[1]) : prev.kpiState,
            skillChanges: skillsMatch ? JSON.parse(skillsMatch[1]) : prev.skillsState,
            toolSettings: { ...prev.governanceTools }
          }
        ]
      } : null);

    } catch (e) {
      console.error('Failed to parse updates:', e);
    }
  }

  const handleToolChange = (key: keyof GovernanceTools, value: number) => {
    if (gameState) {
      setGameState({
        ...gameState,
        governanceTools: {
          ...gameState.governanceTools,
          [key]: value
        }
      })
    }
  }

  const startChat = () => {
    setIsChatStarted(true)
    const newGameState = createNewGame()
    setGameState(newGameState)
    
    setMessages([
      { role: 'system' as const, content: SYSTEM_PROMPT },
      { role: 'assistant' as const, content: SCENARIOS[0] }
    ])
  }

  const moveToNextStage = () => {
    if (!gameState || gameState.currentStage >= SCENARIOS.length - 1) return;

    const nextStage = gameState.currentStage + 1;
    setGameState(prev => prev ? {
      ...prev,
      currentStage: nextStage,
      currentScenario: SCENARIOS[nextStage]
    } : null);

    setMessages(prev => [
      ...prev,
      { role: 'assistant' as const, content: SCENARIOS[nextStage] }
    ]);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim() || isLoading || !gameState) return

    setIsLoading(true)
    // Add user message to chat
    const newMessages = [...messages, { role: 'user' as const, content: userInput }]
    setMessages(newMessages)
    setUserInput('')

    try {
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...newMessages,
        {
          role: 'system',
          content: `Current stage: ${gameState.currentStage + 1}/4
Current governance tools settings: ${JSON.stringify(gameState.governanceTools)}
Current KPIs: ${JSON.stringify(gameState.kpiState)}
Current Skills: ${JSON.stringify(gameState.skillsState)}
${gameState.currentStage === SCENARIOS.length - 1 ? 'This is the final stage. After the player\'s response, provide a comprehensive analysis of their leadership style and skills.' : ''}

Remember to provide your response with KPI and Skills updates in this format:
[KPI_UPDATE]{"publicSupport": X, "economicProsperity": Y, "politicalInfluence": Z, "provincialStability": W}[/KPI_UPDATE]
[SKILLS_UPDATE]{"communication": X, "initiative": Y, "strategicThinking": Z, "creativity": W}[/SKILLS_UPDATE]`
        }
      ]

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.openai.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 1000
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Failed to get response from OpenAI')
      }

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

      if (!aiResponse) {
        throw new Error('Empty response from OpenAI')
      }

      setMessages([...newMessages, { 
        role: 'assistant' as const, 
        content: aiResponse 
      }])

      updateGameState(aiResponse)

      // Check if this was the last stage
      if (gameState.currentStage === SCENARIOS.length - 1) {
        setGameState(prev => prev ? {
          ...prev,
          isComplete: true,
          finalAnalysis: aiResponse.replace(/\[KPI_UPDATE\].*?\[\/KPI_UPDATE\]/g, '')
            .replace(/\[SKILLS_UPDATE\].*?\[\/SKILLS_UPDATE\]/g, '')
        } : null);
      } else {
        // Move to next stage after a brief delay
        setTimeout(moveToNextStage, 2000);
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages([...newMessages, { 
        role: 'assistant' as const, 
        content: `An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.` 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 kaleidoscopic-bg min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-12 gradient-text animate-float">
        Leadership Challenge
      </h1>
      
      {!isChatStarted ? (
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-effect rounded-xl p-12 animate-float">
            <h2 className="text-4xl font-bold mb-8 gradient-text">Test Your Leadership Skills</h2>
            <p className="mb-12 text-gray-300 text-xl leading-relaxed">
              Embark on a journey through historical scenarios that will test your 
              leadership abilities and strategic thinking. Each decision shapes your 
              legacy as a ruler.
            </p>
            <button 
              onClick={startChat}
              className="button-primary text-xl px-12 py-6 rounded-xl font-semibold"
            >
              Begin Your Journey
            </button>
          </div>
        </div>
      ) : (
        <div className="game-interface">
          <div className="flex gap-8">
            {/* Governance Tools Panel */}
            {gameState && (
              <div className="space-y-6">
                <GovernanceTools
                  tools={gameState.governanceTools}
                  onChange={handleToolChange}
                />
                <div className="text-center">
                  <div className="glass-effect rounded-lg px-6 py-3 inline-block">
                    <span className="gradient-text font-semibold">
                      Chapter {gameState.currentStage + 1} of 4
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Chat Interface */}
            <div className="flex-1">
              <div className="glass-effect rounded-xl shadow-xl p-8 mb-6 h-[500px] overflow-y-auto">
                {messages.filter(m => m.role !== 'system').map((message, index) => (
                  <div
                    key={index}
                    className={`mb-8 ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block p-6 rounded-xl max-w-[80%] message-bubble ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-emerald-600 to-green-500 text-white'
                          : 'glass-effect text-gray-100'
                      }`}
                    >
                      <div 
                        className="prose prose-lg max-w-none prose-invert"
                        dangerouslySetInnerHTML={{ 
                          __html: formatMessage(message.content)
                        }}
                      />
                    </div>
                    <div className={`text-sm text-gray-400 mt-2 ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {message.role === 'user' ? 'You' : 'Royal Advisor'} • {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center justify-center space-x-3 my-6">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Share your wisdom..."
                  className="flex-1 p-6 glass-effect rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg text-gray-100 placeholder-gray-400"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="button-primary px-8 rounded-xl font-semibold text-lg"
                >
                  Decree
                </button>
              </form>
            </div>

            {/* Status Panels */}
            {gameState && (
              <div className="space-y-6">
                <KPIDisplay kpis={gameState.kpiState} />
                <SkillsDisplay skills={gameState.skillsState} />
              </div>
            )}
          </div>

          {/* Game Summary Modal */}
          {gameState?.isComplete && (
            <GameSummary gameState={gameState} />
          )}
        </div>
      )}
    </div>
  )
} 