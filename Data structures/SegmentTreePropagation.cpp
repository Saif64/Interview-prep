#include<bits/stdc++.h>

#define     pb      push_back
#define     eps     1e-9
#define     ff      first
#define     ss      second
#define     pi      acos(-1)
#define     inf     INT_MAX/2;
#define     INF     LLONG_MAX/2;
#define     mset(a,x)                    memset(a,(x),sizeof(a))
#define     all(x)                       x.begin(),x.end()
#define     allr(x)                      x.rbegin(),x.rend()
#define     Fast_Read                    ios_base::sync_with_stdio(false); cin.tie(nullptr);  cout.tie(nullptr);
#define     Precision(x)                 cout.setf(ios::fixed); cout.precision(x);

using namespace std;
typedef long double ld;
typedef long long ll;
typedef pair<int,int> pii;
typedef vector<int> vii;
typedef vector<ll> vll;
template < class T> inline T biton(T n,T pos){return n ((T)1<<pos);}
template < class T> inline T bitoff(T n,T pos){return n & ~((T)1<<pos);}
template < class T> inline T ison(T n,T pos){return (bool)(n & ((T)1<<pos));}
template < class T> inline T gcd(T a, T b){while(b){a%=b;swap(a,b);}return a;}
inline int nxt(){int aaa;scanf("%d",&aaa);return aaa;}
inline ll lxt(){ll aaa;scanf("%lld",&aaa);return aaa;}
inline double dxt(){double aaa;scanf("%lf",&aaa);return aaa;}
template < class T> inline void vinput(T n,vector<T> &v){ for(T in,i=0;i<n;i++){cin>>in; v.push_back(in);} }
template < class T> inline void vout(vector<T> v){ for(auto it:v) cout<<it<<" "; cout<<endl; }
const ll M = 1e9+7;
#ifdef ARnAb
     #define debug(...) __f(#__VA_ARGS__, __VA_ARGS__)
    template < typename Arg1 >
    void __f(const char* name, Arg1&& arg1){
        cerr << name << " is " << arg1 << std::endl;
    }
    template < typename Arg1, typename... Args>
    void __f(const char* names, Arg1&& arg1, Args&&... args){
        const char* comma = strchr(names+1, ',');
        cerr.write(names, comma - names) << " is " << arg1 <<"  ";
        __f(comma+1, args...);
    }
#else
    #define debug(...)
#endif
///******************************************START******************************************
const int N = 100010;
int cs=0;
string ss;
struct info
{
    ll sum;
    ll lazy;

} tree[N*4];
void segment_tree(int node,int low,int high)
{
    if(low==high)
    {
        tree[node].sum=ss[low]-'0';
        return;
    }
    int left=2*node;
    int right=2*node+1;
    int mid=(low+high)/2;
    segment_tree(left,low,mid);
    segment_tree(right,mid+1,high);
    tree[node].sum=tree[left].sum+tree[right].sum;
}
void propagate(int node,int low,int hi)
{
    int left=2*node;
    int right=left+1;
    int mid =(low+hi)/2;
    tree[node].sum+=(hi-low+1)*tree[node].lazy;
    if(hi!=low)
    {
        tree[left].lazy+=tree[node].lazy;
        tree[right].lazy+=tree[node].lazy;
    }
    tree[node].lazy=0;
}
void update(int node,int low,int hi,int i,int j,int value)
{
    int left=2*node;
    int right=left+1;
    if(tree[node].lazy)propagate(node,low,hi);
    if(hi<i||j<low) return;
    if(low>=i&&hi<=j)
    {
        tree[node].sum+=(hi-low+1)*value;
        if(hi!=low)
        {
            tree[left].lazy+=value;
            tree[right].lazy+=value;
        }
        tree[node].lazy=0;
        return ;
    }
    int mid=(low+hi)/2;
    update(left,low,mid,i,j,value);
    update(right,mid+1,hi,i,j,value);
    tree[node].sum=tree[left].sum+tree[right].sum;
}
ll query(int node,int low,int hi,int i,int j)
{
    int left=2*node;
    int right=left+1;
    if(tree[node].lazy)propagate(node,low,hi);
    if(hi<i||j<low) return 0;
    if(low>=i&&hi<=j)
        return tree[node].sum;
    int mid=(low+hi)/2;
    ll x= query(left,low,mid,i,j);
    ll y= query(right,mid+1,hi,i,j);
    return x+y;

}
void solve()
{

    memset(tree,0,sizeof tree);
    cin>>ss;
    ss="x"+ss;
    int n = ss.size();
    segment_tree(1,1,n);
    int q;
    cin>>q;
    cout<<"Case "<<++cs<<":"<<endl;
    while(q--)
    {
        char c;
        cin>>c;
        if(c=='I')
        {
            ll i,j;
            cin>>i>>j;
            update(1,1,n,i,j,1);
        }
        else
        {
            ll x;
            cin>>x;
            int ans  = query(1,1,n,x,x);
            cout<<ans%2<<endl;
        }
    }
}
int main()
{
    Fast_Read
    Precision(2)
    #ifdef ARnAb
        double start_time = clock();
        ///freopen ("output.txt","w",stdout);
        ///freopen ("input.txt","r",stdin);
    #endif
    int tc=1;
    cin>>tc;
    while(tc--)
        solve();
    return 0;
}
