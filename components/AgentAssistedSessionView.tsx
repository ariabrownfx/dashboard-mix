
import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';
import { ManagedTrader, AgentProfile } from '../types';

interface AgentAssistedSessionViewProps {
  trader: ManagedTrader;
  agent: AgentProfile;
  onBack: () => void;
}

type SessionStep = 'AUTH' | 'DASHBOARD' | 'ACTION_FORM' | 'APPROVAL' | 'SUCCESS';
type ActionType = 'REPAYMENT' | 'ESUSU' | 'SAVINGS' | 'WITHDRAWAL';

export const AgentAssistedSessionView: React.FC<AgentAssistedSessionViewProps> = ({ trader, agent, onBack }) => {
  const [step, setStep] = useState<SessionStep>('AUTH');
  const [authMethod, setAuthMethod] = useState<'QR' | 'PIN'>('QR');
  const [pin, setPin] = useState('');
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
  const [amount, setAmount] = useState('');
  const [withdrawalReason, setWithdrawalReason] = useState('Business Expansion');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEligibleForLoan, setIsEligibleForLoan] = useState(false);
  
  // Simulation for QR scanning and backend check
  useEffect(() => {
    if (step === 'AUTH' && authMethod === 'QR') {
        const timer = setTimeout(() => {
            setStep('DASHBOARD');
            // Mock a credit eligibility check
            setIsEligibleForLoan(Math.random() > 0.3);
        }, 3000);
        return () => clearTimeout(timer);
    }
  }, [step, authMethod]);

  const handlePinDigit = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin.length === 4) {
        setTimeout(() => {
            setStep('DASHBOARD');
            setIsEligibleForLoan(true);
        }, 500);
      }
    }
  };

  const startAction = (type: ActionType) => {
      setSelectedAction(type);
      setStep('ACTION_FORM');
      setAmount('');
  };

  const requestApproval = () => {
      setStep('APPROVAL');
  };

  const finalizeTransaction = () => {
      setIsProcessing(true);
      setTimeout(() => {
          setIsProcessing(false);
          setStep('SUCCESS');
      }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-in slide-in-from-bottom duration-500 overflow-hidden">
      
      {/* Dynamic Header */}
      <header className="flex items-center justify-between p-4 bg-slate-900/50 backdrop-blur-md border-b border-white/5 shrink-0 z-50">
        <div className="flex items-center gap-3">
            <button onClick={onBack} className="size-10 rounded-full bg-white/5 flex items-center justify-center text-white active:scale-90 transition-transform">
                <Icon name="close" />
            </button>
            <div>
                <h1 className="text-white font-black text-sm uppercase tracking-widest">{step === 'AUTH' ? 'Secure Login' : 'Assisted Mode'}</h1>
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-tighter flex items-center gap-1">
                    <Icon name="verified_user" className="text-[10px]" />
                    Session: {trader.name}
                </p>
            </div>
        </div>
        {step !== 'AUTH' && (
            <div className="flex items-center gap-2">
                {isEligibleForLoan && (
                    <div className="size-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 animate-pulse border border-emerald-500/30" title="Loan Eligible">
                        <Icon name="auto_graph" className="text-sm" />
                    </div>
                )}
                <div className="size-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-lg shadow-amber-500/10">
                    <Icon name="record_voice_over" className="text-xl" />
                </div>
            </div>
        )}
      </header>

      <div className="flex-1 overflow-y-auto">
        
        {step === 'AUTH' && (
            <div className="p-8 flex flex-col items-center justify-center min-h-[80vh] text-center animate-in fade-in duration-500">
                <div className="size-24 rounded-[2rem] bg-amber-500 flex items-center justify-center text-white mb-8 shadow-2xl shadow-amber-500/20">
                    <Icon name="lock_person" className="text-5xl" />
                </div>
                <h2 className="text-3xl font-black text-white mb-2 tracking-tighter">Trader Validation</h2>
                <p className="text-slate-400 text-sm mb-10 max-w-xs">Scan the trader's physical card QR or have them enter their private PIN to unlock this session.</p>

                {authMethod === 'QR' ? (
                    <div className="space-y-8 w-full max-w-xs">
                        <div className="aspect-square bg-slate-900 rounded-[3rem] border-2 border-dashed border-amber-500/30 p-8 flex flex-col items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-amber-500/5 animate-pulse" />
                            <Icon name="qr_code_scanner" className="text-6xl text-amber-500 mb-4 animate-bounce" />
                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Scanning Card...</span>
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-amber-500 shadow-[0_0_15px_#f59e0b] animate-scan-line" />
                        </div>
                        <button onClick={() => setAuthMethod('PIN')} className="text-[10px] font-black text-slate-500 uppercase tracking-widest underline underline-offset-8 decoration-white/10">Use PIN Code Instead</button>
                    </div>
                ) : (
                    <div className="space-y-8 w-full max-w-xs">
                        <div className="flex justify-center gap-4">
                            {[0, 1, 2, 3].map(i => (
                                <div key={i} className={`size-4 rounded-full border-2 transition-all ${pin.length > i ? 'bg-amber-500 border-amber-500 scale-110' : 'border-slate-800'}`} />
                            ))}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {['1','2','3','4','5','6','7','8','9','','0','back'].map((k, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => k === 'back' ? setPin(prev => prev.slice(0, -1)) : k && handlePinDigit(k)}
                                    className={`size-16 rounded-2xl flex items-center justify-center font-black text-xl transition-all active:scale-90 ${k === '' ? 'invisible' : 'bg-white/5 text-white hover:bg-white/10 border border-white/5'}`}
                                >
                                    {k === 'back' ? <Icon name="backspace" /> : k}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setAuthMethod('QR')} className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Back to QR Scanner</button>
                    </div>
                )}
            </div>
        )}

        {step === 'DASHBOARD' && (
            <div className="p-6 space-y-6 animate-in slide-in-from-bottom duration-500">
                {/* Eligibility Toast */}
                {isEligibleForLoan && (
                    <div className="bg-emerald-500 rounded-2xl p-4 text-white flex items-center justify-between shadow-lg shadow-emerald-500/20 animate-in bounce duration-1000">
                        <div className="flex items-center gap-3">
                            <Icon name="rocket_launch" />
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100">Credit Offer</p>
                                <p className="text-xs font-bold">Eligible for ₦15,000 top-up!</p>
                            </div>
                        </div>
                        <button className="px-3 py-1 bg-white text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">View Offer</button>
                    </div>
                )}

                {/* Physical Card Mirror */}
                <div className="bg-amber-50 dark:bg-[#fbf7e6] p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden border-2 border-amber-200 dark:border-amber-900/20">
                    <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Icon name="edit_document" className="text-9xl text-amber-900" /></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                             <div>
                                 <p className="text-[10px] font-black text-amber-900/40 uppercase tracking-widest mb-1">Mirroring Analog Card</p>
                                 <h3 className="text-2xl font-black text-amber-900">{trader.businessName}</h3>
                                 <p className="text-amber-900/60 text-[10px] font-bold">Member Since Oct 2023</p>
                             </div>
                             <div className="size-12 rounded-2xl bg-amber-900 flex items-center justify-center text-white shadow-xl">
                                 <Icon name="fingerprint" />
                             </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-end border-b border-amber-900/10 pb-4">
                                <div>
                                    <p className="text-[9px] font-black text-amber-900/40 uppercase tracking-widest mb-1">Loan Balance</p>
                                    <p className="text-xl font-black text-amber-900 leading-none">₦12,400</p>
                                </div>
                                <button onClick={() => startAction('REPAYMENT')} className="px-4 py-2 bg-amber-900 text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg active:scale-95 transition-transform">Log Repayment</button>
                            </div>
                            <div className="flex justify-between items-end border-b border-amber-900/10 pb-4">
                                <div>
                                    <p className="text-[9px] font-black text-amber-900/40 uppercase tracking-widest mb-1">Esusu Saved</p>
                                    <p className="text-xl font-black text-amber-900 leading-none">₦8,500</p>
                                </div>
                                <button onClick={() => startAction('ESUSU')} className="px-4 py-2 bg-amber-900 text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg active:scale-95 transition-transform">Collect Daily</button>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[9px] font-black text-amber-900/40 uppercase tracking-widest mb-1">Personal Goal</p>
                                    <p className="text-xl font-black text-amber-900 leading-none">₦45,000</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => startAction('SAVINGS')} className="px-4 py-2 bg-amber-900 text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg active:scale-95 transition-transform">Top Up</button>
                                    <button onClick={() => startAction('WITHDRAWAL')} className="px-4 py-2 bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg active:scale-95 transition-transform border border-white/10">Withdraw</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <button className="w-full py-5 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-between px-6 group active:scale-[0.98] transition-all">
                        <div className="flex items-center gap-4">
                            <div className="size-10 rounded-2xl bg-indigo-500 flex items-center justify-center text-white">
                                <Icon name="update" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-black text-white leading-none">Activity Report</p>
                                <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">Review last 30 entries</p>
                            </div>
                        </div>
                        <Icon name="chevron_right" className="text-slate-600 group-hover:text-white transition-colors" />
                    </button>
                    
                    <button className="w-full py-5 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-between px-6 group active:scale-[0.98] transition-all">
                        <div className="flex items-center gap-4">
                            <div className="size-10 rounded-2xl bg-slate-700 flex items-center justify-center text-white">
                                <Icon name="badge" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-black text-white leading-none">KYC Verification</p>
                                <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">Status: Level 1 Verified</p>
                            </div>
                        </div>
                        <Icon name="chevron_right" className="text-slate-600 group-hover:text-white transition-colors" />
                    </button>
                </div>
            </div>
        )}

        {step === 'ACTION_FORM' && (
            <div className="p-6 space-y-8 animate-in slide-in-from-right duration-400">
                <div className="text-center">
                    <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${selectedAction === 'WITHDRAWAL' ? 'text-rose-500' : 'text-amber-500'}`}>
                        {selectedAction === 'WITHDRAWAL' ? 'Initiating Payout' : 'Recording Transaction'}
                    </p>
                    <h2 className="text-3xl font-black text-white">{selectedAction?.replace('_', ' ')}</h2>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                            {selectedAction === 'WITHDRAWAL' ? 'Request Amount (₦)' : 'Amount to Record (₦)'}
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-black text-slate-600">₦</span>
                            <input 
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className={`w-full text-center py-8 bg-white/5 border-none rounded-[2rem] text-5xl font-black text-white outline-none focus:ring-2 ${selectedAction === 'WITHDRAWAL' ? 'focus:ring-rose-500' : 'focus:ring-amber-500'}`}
                                placeholder="0"
                                autoFocus
                            />
                        </div>
                    </div>

                    {selectedAction === 'WITHDRAWAL' && (
                        <div className="space-y-2 animate-in slide-in-from-top-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Withdrawal Purpose</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Inventory', 'Emergency', 'Shop Rent', 'Personal'].map(reason => (
                                    <button 
                                        key={reason}
                                        onClick={() => setWithdrawalReason(reason)}
                                        className={`py-3 rounded-2xl text-[10px] font-black uppercase border transition-all ${withdrawalReason === reason ? 'bg-rose-500 text-white border-rose-500 shadow-lg' : 'bg-white/5 text-slate-500 border-white/10'}`}
                                    >
                                        {reason}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={`p-5 rounded-3xl border flex gap-4 ${selectedAction === 'WITHDRAWAL' ? 'bg-rose-500/10 border-rose-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                        <div className={`size-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg ${selectedAction === 'WITHDRAWAL' ? 'bg-rose-500 shadow-rose-500/20' : 'bg-amber-500 shadow-amber-500/20'}`}>
                            <Icon name={selectedAction === 'WITHDRAWAL' ? "outbox" : "history_edu"} />
                        </div>
                        <div>
                            <p className={`text-xs font-bold mb-1 ${selectedAction === 'WITHDRAWAL' ? 'text-rose-500' : 'text-amber-500'}`}>
                                {selectedAction === 'WITHDRAWAL' ? 'Liquidity Protocol' : 'Ledger Sync'}
                            </p>
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                                {selectedAction === 'WITHDRAWAL' 
                                    ? 'Withdrawals are final once authorized. Ensure the trader receives the exact physical cash or mobile money value.' 
                                    : 'Ensure the amount matches what you intend to write on the trader\'s physical card. Accuracy is mandatory.'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-slate-900 border-t border-white/5 z-50">
                    <button 
                        onClick={requestApproval}
                        disabled={!amount || Number(amount) <= 0}
                        className={`w-full py-5 text-white font-black uppercase text-xs tracking-[0.4em] rounded-[2rem] shadow-xl active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-3 ${selectedAction === 'WITHDRAWAL' ? 'bg-rose-600' : 'bg-amber-500'}`}
                    >
                        <span>{selectedAction === 'WITHDRAWAL' ? 'Review Payout' : 'Request Approval'}</span>
                        <Icon name="arrow_forward" />
                    </button>
                </div>
            </div>
        )}

        {step === 'APPROVAL' && (
            <div className="p-8 flex flex-col items-center justify-center min-h-[80vh] text-center animate-in zoom-in-95 duration-400">
                <div className={`size-32 rounded-full border-4 flex items-center justify-center relative mb-10 ${selectedAction === 'WITHDRAWAL' ? 'border-rose-500' : 'border-amber-500'}`}>
                    <div className={`absolute inset-0 animate-ping rounded-full ${selectedAction === 'WITHDRAWAL' ? 'bg-rose-500/20' : 'bg-amber-500/20'}`} />
                    <Icon name="fingerprint" className={`text-6xl ${selectedAction === 'WITHDRAWAL' ? 'text-rose-500' : 'text-amber-500'}`} />
                </div>
                
                <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">Trader Confirmation</h2>
                <p className="text-slate-400 text-base mb-2">Please hand the device to <span className="text-white font-bold">{trader.name}</span>.</p>
                <p className="text-sm text-slate-500 mb-10 max-w-xs leading-relaxed">
                    {selectedAction === 'WITHDRAWAL' 
                        ? `By tapping "Authorize", you confirm that you want to withdraw ₦${amount} from your savings and have agreed on the payout method with Agent ${agent.name}.`
                        : `By tapping "Authorize", you confirm that you have given ₦${amount} to Agent ${agent.name} for ${selectedAction?.toLowerCase()}.`
                    }
                </p>

                <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6 mb-10">
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <span className="text-[10px] font-black text-slate-500 uppercase">Action Type</span>
                        <span className="text-sm font-black text-white">{selectedAction}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase">Final Amount</span>
                        <span className={`text-2xl font-black ${selectedAction === 'WITHDRAWAL' ? 'text-rose-500' : 'text-amber-500'}`}>₦{Number(amount).toLocaleString()}</span>
                    </div>
                </div>

                <div className="w-full space-y-3">
                    <button 
                        onClick={finalizeTransaction}
                        disabled={isProcessing}
                        className="w-full py-5 bg-primary text-white font-black uppercase text-xs tracking-[0.4em] rounded-[2rem] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        {isProcessing ? <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Authorize & Commit'}
                    </button>
                    <button 
                        onClick={() => setStep('ACTION_FORM')}
                        className="w-full py-4 text-xs font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
                    >
                        Modify or Cancel
                    </button>
                </div>
            </div>
        )}

        {step === 'SUCCESS' && (
            <div className="p-8 flex flex-col items-center justify-center min-h-[80vh] text-center animate-in zoom-in duration-500">
                <div className={`size-24 rounded-full flex items-center justify-center mb-8 shadow-2xl ${selectedAction === 'WITHDRAWAL' ? 'bg-rose-500 shadow-rose-500/20' : 'bg-emerald-500 shadow-emerald-500/20'}`}>
                    <Icon name={selectedAction === 'WITHDRAWAL' ? "payments" : "task_alt"} className="text-5xl text-white" />
                </div>
                <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">
                    {selectedAction === 'WITHDRAWAL' ? 'Payout Success!' : 'Record Minted!'}
                </h2>
                <p className="text-slate-400 text-sm mb-12">
                    {selectedAction === 'WITHDRAWAL' ? 'Withdrawal transaction finalized.' : 'Digital ledger synced with mobile wallet.'}
                </p>

                <div className="w-full max-w-sm bg-white p-8 rounded-[3rem] text-slate-900 space-y-6 shadow-2xl border-4 relative transition-colors duration-500 border-emerald-500">
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full">Synchronization</div>
                     <h3 className="font-black text-lg">Sync Physical Card</h3>
                     <p className="text-xs text-slate-500 leading-relaxed">Please update the trader's physical paper card with these details:</p>
                     
                     <div className="bg-slate-50 rounded-2xl p-5 border-2 border-dashed border-slate-200 text-left space-y-3">
                        <div className="flex justify-between">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Date</span>
                            <span className="text-sm font-bold">{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Action</span>
                            <span className={`text-sm font-black uppercase ${selectedAction === 'WITHDRAWAL' ? 'text-rose-600' : 'text-emerald-600'}`}>{selectedAction}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Amount</span>
                            <span className={`text-sm font-black ${selectedAction === 'WITHDRAWAL' ? 'text-rose-600' : 'text-emerald-600'}`}>₦{Number(amount).toLocaleString()}</span>
                        </div>
                        {selectedAction === 'WITHDRAWAL' && (
                            <div className="flex justify-between">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Payout Ref</span>
                                <span className="text-[10px] font-mono font-bold text-slate-900">WD-{Math.random().toString(36).substring(7).toUpperCase()}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verify ID</span>
                            <span className="text-[10px] font-mono font-bold text-slate-900">SYNC-{Math.random().toString(36).substring(7).toUpperCase()}</span>
                        </div>
                     </div>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-tight">Apply the branch stamp to confirm physical hand-over of value.</p>
                </div>

                <button 
                    onClick={() => setStep('DASHBOARD')}
                    className="w-full mt-10 py-5 bg-white text-slate-950 font-black uppercase text-xs tracking-[0.3em] rounded-[2rem] shadow-xl active:scale-95 transition-all"
                >
                    Return to Surrogate
                </button>
            </div>
        )}

      </div>

      <style>{`
        @keyframes scan-line {
            0% { top: 0%; }
            50% { top: 100%; }
            100% { top: 0%; }
        }
        .animate-scan-line {
            animation: scan-line 3s infinite ease-in-out;
        }
        @keyframes tada {
            0% { transform: scale(1); }
            10%, 20% { transform: scale(0.9) rotate(-3deg); }
            30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
            40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
            100% { transform: scale(1) rotate(0); }
        }
        .animate-tada {
            animation: tada 1s infinite;
        }
      `}</style>
    </div>
  );
};
