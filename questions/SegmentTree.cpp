#include<bits/stdc++.h>

#define     ll      long long
#define     pb      push_back
#define     eps     1e-9
#define     ff      first
#define     ss      second
#define     pi      acos(-1)
#define     Fast_Read                    ios_base::sync_with_stdio(false); cin.tie(nullptr);  cout.tie(nullptr);
#define     Precision(x)                 cout.setf(ios::fixed); cout.precision(x);

using namespace std;
typedef long double ld;
ll input()
{
    ll n;
    scanf("%lld",&n);
    return n;
}
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
ll cs=0;
vector<ll>v;
struct data{
    ll val;
    data(ll _val)
    {
        val=_val;
    }
    data(){val=0;}
};
data tree[4*100005];
void buildTree(ll node,ll s,ll e)
{
    if(s==e)
    {
        tree[node].val=v[s];
        return;
    }
    ll mid=(s+e)/2;
    ll left=2*node;
    ll right=left+1;
    buildTree(left,s,mid);
    buildTree(right,mid+1,e);
    tree[node].val=tree[left].val+tree[right].val;
}
void update(ll node,ll s,ll e,ll i,ll v)
{
    if(i<s || i>e)  return;
    if(s==e)
    {
        if(s==i)
        {
            tree[node].val+=v;
            return;
        }
        else
            return;
    }
    ll mid=(s+e)/2;
    ll left=2*node;
    ll right=left+1;
    update(left,s,mid,i,v);
    update(right,mid+1,e,i,v);
    tree[node].val=tree[left].val+tree[right].val;
}
ll query(ll node,ll s,ll e,ll i,ll j)
{
    if(j<s || i>e)
    {
        return 0;
    }
    if(i<=s && j>=e)
    {
        return tree[node].val;
    }
    ll mid=(s+e)/2;
    ll left=2*node;
    ll right=left+1;
    ll x= query(left,s,mid,i,j);
    ll y= query(right,mid+1,e,i,j);
    return x+y;
}
void solve()
{
    memset(tree,0,sizeof tree);
    v.clear();
    ll n=input(),q=input();
    for(ll i=0;i<n;i++)
    {
        ll in=input();
        v.pb(in);
    }
    buildTree(1,0,n-1);
    printf("Case %d:\n",++cs);
    while(q--)
    {
        ll op=input();
        if(op==1)
        {
            ll i=input();
            ll x=query(1,0,n-1,i,i);
            printf("%lld\n",x);
            update(1,0,n-1,i,-x);
        }
        else if(op==2)
        {
            ll i=input(),v=input();
            update(1,0,n-1,i,v);
        }
        else if(op==3)
        {
            ll i=input(),j=input();
            printf("%lld\n",query(1,0,n-1,i,j));
        }
    }
}
int main()
{
    ///Fast_Read
    Precision(2)
    #ifdef ARnAb
        double start_time = clock();
        ///freopen ("output.txt","w",stdout);
        ///freopen ("input.txt","r",stdin);
    #endif
    ll tc=input();
    ///cin>>tc;
    while(tc--)
        solve();
    return 0;
}
