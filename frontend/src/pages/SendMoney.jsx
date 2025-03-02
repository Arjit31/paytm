import { AuthWrapper } from '../components/AuthWrapper';
import { InputBox } from '../components/InputBox';

function SendMoney() {
    return (
        <AuthWrapper>
            <div class="flex flex-col space-y-1.5 p-6">
                <h2 class="text-3xl font-bold text-center">Send Money</h2>
            </div>
                <div class="flex items-center w-full space-x-4">
                    <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <span class="text-2xl text-white">A</span>
                    </div>
                    <h3 class="text-2xl font-semibold">Friend's Name</h3>
                </div>
                <div class="space-y-4 w-full mb-4">
                    <div class="space-y-2">
                        <InputBox placeholder="Enter amount" label="Amount (in Rs)" type="number" id="amount"/>
                    </div>
                    <button class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                </div>
        </AuthWrapper>
    );
}

export { SendMoney };